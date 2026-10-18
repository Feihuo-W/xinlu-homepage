# 吕欣 · 个人学术主页（新版）

参考 Human Nature Lab 的视觉语言重新设计：深墨底色、Sora 显示字体、紫粉渐变强调、编辑式栅格。全部为手写静态页面，无框架、无后台，可直接部署。

## 本地预览

直接双击 `index.html` 即可预览（无需服务器）。

若需局域网/本机服务：

```bash
python -m http.server 8765 --directory site
# 打开 http://127.0.0.1:8765/
```

## 页面结构

| 文件 | 内容 |
| --- | --- |
| `index.html` / `index_cn.html` | 首页：Hero、个人简介、五个研究方向、代表作、荣誉、媒体报道 |
| `research.html` / `research_cn.html` | 研究方向详情（含代表论文） |
| `publications.html` / `publications_cn.html` | 198 篇论文，按年分组，支持关键词与年份筛选 |
| `press.html` / `press_cn.html` | 88 条媒体报道，按年筛选 |
| `people.html` / `people_cn.html` | 39 位合作者，支持搜索 |
| `contact.html` / `contact_cn.html` | 联系方式与单位地址 |
| `assets/css/style.css` | 全站设计系统与响应式样式 |
| `assets/js/site.js` | 导航、滚动动画、筛选与渲染逻辑 |
| `assets/data.js` | 论文 / 新闻 / 合作者数据（由旧站内容自动生成） |
| `assets/img/` | Hero 网络图、五张研究插图、肖像占位图 |
| `assets/fonts/` | Sora 字体（SIL Open Font License） |

## 图片：占位与替换

站点已预留 5 类图片位，没有图片时显示虚线占位框，不会破版：

| 位置 | 文件 | 尺寸 |
| --- | --- | --- |
| 首页肖像 | `assets/img/portrait.jpg` | 4:5，1200×1500 |
| 首屏背景 | `assets/img/hero.jpg` | 3:2，2400×1600 |
| 首页“影像记录” | `assets/img/gallery-01.jpg` … `gallery-06.jpg` | 4:3，1600×1200 |
| 联系页校园照 | `assets/img/contact-campus.jpg` | 21:9，2000×860 |
| 合作者头像 | `assets/img/people/<姓名>.jpg` | 1:1，400×400 |

按文件名放进对应目录、刷新页面即可生效，**无需重新构建**。完整清单、39 位合作者的标准文件名、裁切与压缩建议、图注修改方法，见 **[IMAGES.md](IMAGES.md)**。

## 内容维护

- 论文、新闻、合作者数据在 `assets/data.js`（`window.SITE_DATA`），结构清晰，可直接增删条目。
- 更推荐回到生成脚本：修改 `tools/build_data.py`（或原始 `2026主页` 的内容）后重新运行：

```bash
python tools/build_data.py   # 解析旧站内容 → assets/data.js
python tools/build_site.py   # 重新生成全部页面
```

- 首页的“代表作”“荣誉”“媒体报道精选”在 `tools/build_site.py` 的 `SELECTED`、`HONORS`、`PRESS_HIGHLIGHTS` 中维护。
- 研究方向的标题、简介、配图与代表论文在 `TOPICS`、`TOPIC_PAPERS` 中维护。

## 部署

把 `site/` 目录内的全部文件上传到任意静态托管（Nginx、GitHub Pages、Netlify、Vercel、对象存储）即可，无需数据库或后端。绑定的域名直接指向该目录。

GitHub Pages 的逐步操作见 **[DEPLOY-GITHUB.md](DEPLOY-GITHUB.md)**。

## 说明

- 旧站的 PDF 文件（`files/*.pdf`）不在当前文件夹内，因此论文标题统一链接到 Google Scholar 检索结果；如已有 PDF，可放入 `site/files/` 并把 `assets/data.js` 中对应 `href` 改为本地路径。
- 单位地址、荣誉称号措辞、CV 链接等建议按最新情况再核对一遍。
- 页面无第三方统计与追踪代码；如需统计可自行加入。
