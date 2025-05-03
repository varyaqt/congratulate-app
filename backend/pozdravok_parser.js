const axios = require('axios');
const cheerio = require('cheerio');
const { MongoClient } = require('mongodb');
const { DateTime } = require('luxon');
const iconv = require('iconv-lite');

const client = new MongoClient("mongodb+srv://mi1en:1234@cluster0.qbxk9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const db = client.db("congrats");
const collection = db.collection("congratulations");

const headers = {
    "User-Agent": "Mozilla/5.0",
    "Accept-Charset": "UTF-8"
};

const BASE_DOMAIN = "https://pozdravok.com";

// Конфигурация для парсинга (категория: URL)
const CATEGORIES = {
    "День рождения": "/pozdravleniya/den-rozhdeniya/",
    "Свадьба": "/pozdravleniya/svadba/",
    "Новый год": "/pozdravleniya/noviy-god/",
    "Юбилей": "/pozdravleniya/yubiley/"
};

async function parseCongratulations(category, subcategory, baseUrl, maxPages = 3) {
    for (let i = 1; i <= maxPages; i++) {
        const url = i === 1 ? baseUrl : `${baseUrl}${i}.htm`;
        console.log(`📄 Парсим страницу: ${url}`);

        try {
            const response = await axios.get(url, {
                headers,
                responseType: 'arraybuffer',
                // Игнорируем гендерные подкатегории
                transformResponse: [data => data],
                params: {
                    // Исключаем гендерные разделы
                    gender: 'unisex'
                }
            });

            const html = iconv.decode(response.data, 'win1251');
            const $ = cheerio.load(html);

            // Ищем блоки с поздравлениями, исключая гендерные
            const blocks = $("div.content p:not(.gender-specific)").filter((i, el) => {
                const text = $(el).text().trim();
                return text.length > 0 &&
                       !text.includes('мужчин') &&
                       !text.includes('женщин') &&
                       !text.includes('юнош') &&
                       !text.includes('девуш');
            });

            if (blocks.length === 0) {
                console.log("⚠️ Нет подходящих поздравлений на странице");
                break;
            }

            const promises = [];
            blocks.each((index, block) => {
                const text = $(block).text().trim()
                    .replace(/(\bдля\b|\bмужчин\b|\bженщин\b|\bпарню\b|\bдевушке\b)/gi, '')
                    .replace(/^\s*[-–]\s*/, '')
                    .trim();

                if (text && text.length > 20) { // Отсеиваем слишком короткие тексты
                    const doc = {
                        category: category,
                        subcategory: subcategory || 'Общие',
                        text: text,
                        is_universal: true,
                        source_url: url,
                        created_at: DateTime.now().toISO()
                    };
                    promises.push(collection.insertOne(doc));
                    console.log(`✅ Добавлено: ${text.slice(0, 50)}...`);
                }
            });

            await Promise.all(promises);
            await new Promise(resolve => setTimeout(resolve, 1500)); // Задержка

        } catch (error) {
            console.log(`⚠️ Ошибка при обработке ${url}: ${error.message}`);
            if (error.response?.status === 404) break; // Прекращаем если страницы нет
        }
    }
}

async function getSubcategories(categoryName, categoryPath, maxPages = 3) {
    const categoryUrl = BASE_DOMAIN + categoryPath;
    console.log(`🔍 Парсим категорию: ${categoryName} (${categoryUrl})`);

    try {
        const response = await axios.get(categoryUrl, {
            headers,
            responseType: 'arraybuffer'
        });

        const html = iconv.decode(response.data, 'win1251');
        const $ = cheerio.load(html);

        // Ищем подкатегории, исключая гендерные
        const subcategoryLinks = $("ul.subcategories a").filter((i, el) => {
            const text = $(el).text().toLowerCase();
            return !text.includes('мужчин') &&
                   !text.includes('женщин') &&
                   !text.includes('парню') &&
                   !text.includes('девушке');
        });

        if (subcategoryLinks.length > 0) {
            console.log(`🔗 Найдено универсальных подкатегорий: ${subcategoryLinks.length}`);
            subcategoryLinks.each((index, link) => {
                const name = $(link).text().trim();
                const href = $(link).attr("href");
                const fullUrl = BASE_DOMAIN + href;
                parseCongratulations(categoryName, name, fullUrl, maxPages);
            });
        } else {
            console.log("ℹ️ Универсальные подкатегории не найдены, парсим основную категорию");
            parseCongratulations(categoryName, null, categoryUrl, maxPages);
        }
    } catch (error) {
        console.log(`⚠️ Ошибка при парсинге категории ${categoryName}: ${error.message}`);
    }
}

// 🏁 Запуск парсера для всех категорий
async function runParser() {
    try {
        await client.connect();
        console.log("✔️ Подключено к MongoDB");

        for (const [categoryName, categoryPath] of Object.entries(CATEGORIES)) {
            await getSubcategories(categoryName, categoryPath, 3);
        }

    } catch (error) {
        console.error(`Ошибка: ${error.message}`);
    } finally {
        await client.close();
        console.log("🔌 Отключено от MongoDB");
    }
}

runParser();