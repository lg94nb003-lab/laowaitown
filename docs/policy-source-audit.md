# LAOWAITOWN Policy Source Audit

Checked date: 2026-05-27

This is a source audit, not an approved data update. Protected arrays in `shared/visa-data.js` still require an explicit `[approved-data-update]` request before editing.

## Source snapshot

| Policy area | Official source checked | Current official signal | Local status |
| --- | --- | --- | --- |
| 30-day unilateral visa-free entry | https://en.nia.gov.cn/n147418/n147463/c183390/content.html | NIA page dated 2026-02-17 lists 50 countries, 30 days, ordinary passports, business/tourism/family or friends/exchange/transit. | Local `visaFreeCountries` has 50 entries and includes Canada/UK. Looks aligned at count level. |
| 240-hour transit visa-free | https://en.nia.gov.cn/n147418/n147468/c187308/content.html | NIA notice dated 2025-11-03 says 55 countries, 65 ports, 24 provinces, stay no more than 240 hours. | Local count is 55 countries, 65 ports, 24 provinces, but country membership needs approved correction. |
| 240-hour policy interpretation | https://en.nia.gov.cn/n147418/n147463/c183412/content.html | NIA interpretation dated 2025-07-04 says 55 countries, 65 ports, 24 provinces, no more than 10 days. | Matches local count-level summary. |
| Hainan visa-free entry | https://en.hainan.gov.cn/englishsite/TTravel/202506/c7cc60e9b7964abe9721a5e601f27506.shtml?ddtab=true | Hainan page updated 2025-08-20 says 59 eligible countries, up to 30 days, Hainan administrative region only. | Local `hainan59Countries` has 59 entries. Looks aligned at count level. |

## Approved data update

Updated on 2026-05-27 with owner approval:

- Request: `[approved-data-update] Update 240-hour transit country list to match NIA 2025-11-03 source.`
- Source: https://en.nia.gov.cn/n147418/n147468/c187308/content.html
- Reason: align `transit240Countries` with NIA 55-country list.

Changes made:

- Removed `Liechtenstein` from `transit240Countries`.
- Removed `Georgia` from `transit240Countries`.
- Added `Ukraine` to `transit240Countries`.
- Added `Indonesia` to `transit240Countries`.
- Updated the hand-written country list in `/visa/240-hour-transit-visa.html`.

Recommended bilingual commit message:

`Update 240h transit country list from NIA source / 根据移民局来源更新240小时过境免签国家名单`

## Non-data source cleanup done

- SEO generated pages now point to the newer NIA unilateral visa-free list instead of the older State Council summary.
- SEO generated pages now point to the Hainan 2025-08-20 travel guide URL.
