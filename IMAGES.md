# 图片添加指南

站点里所有图片位都做了**占位与回退**：没有图片时不会破版，会显示虚线框和“该放哪个文件、多大尺寸”；按文件名把图片放进去，刷新即可生效，**不需要重新构建**。

> 先记住一个原则：**文件名必须完全一致（全小写、连字符、`.jpg`）**。Linux 服务器区分大小写，`Portrait.JPG` 不会生效。

## 一、图片清单一览

| 文件（相对 `xinlu-homepage/`） | 出现位置 | 建议尺寸 | 建议内容 | 没放图时 |
| --- | --- | --- | --- | --- |
| `assets/img/portrait.jpg` | 首页“个人简介”右侧肖像 | 1200×1500（4:5） | 正面或半身、深色背景、肩部以上 | 显示 “XL” 渐变占位 |
| `assets/img/hero.jpg` | 首页首屏背景 | 2400×1600（3:2） | 城市夜景、灾区现场、网络/数据可视化等暗调照片；主体放右侧 | 显示生成网络图 |
| `assets/img/gallery-01.jpg` | 首页“影像记录”第 1 张 | 1600×1200（4:3） | 田野调查：孟加拉/海地/灾区，基站或调研场景 | 虚线占位框 |
| `assets/img/gallery-02.jpg` | 第 2 张 | 1600×1200 | 课堂/讲座：国防科大教室、报告现场 | 虚线占位框 |
| `assets/img/gallery-03.jpg` | 第 3 张 | 1600×1200 | 灾害与应急：海地 2010、疫情应对档案照 | 虚线占位框 |
| `assets/img/gallery-04.jpg` | 第 4 张 | 1600×1200 | 团队合影：长沙校园、课题组 | 虚线占位框 |
| `assets/img/gallery-05.jpg` | 第 5 张 | 1600×1200 | 学术会议：复杂网络、AI、系统科学 | 虚线占位框 |
| `assets/img/gallery-06.jpg` | 第 6 张 | 1600×1200 | 城市/数据可视化：夜景、轨迹图、网络图 | 虚线占位框 |
| `assets/img/contact-campus.jpg` | 联系页底部通栏 | 2000×860（约 21:9） | 校园、学院楼、长沙城市天际线 | 虚线占位框 |
| `assets/img/people/<姓名>.jpg` | 合作者卡片头像 | 400×400（1:1） | 证件照/头像，人脸居中 | 显示姓名首字母 |

## 二、最短操作流程（Windows）

1. **裁切**：按上表比例裁切，不要拉伸。例如肖像 4:5，图库 4:3。
2. **压到 500 KB 以内**：导出 JPG、sRGB、质量 75–85；推荐 [Squoosh](https://squoosh.app/) 或 TinyPNG。
3. **重命名**：全小写，例如 `portrait.jpg`、`gallery-01.jpg`、`contact-campus.jpg`。
4. **复制进文件夹**：
   ```
   xinlu-homepage\assets\img\portrait.jpg
   xinlu-homepage\assets\img\gallery-01.jpg
   xinlu-homepage\assets\img\people\amy-wesolowski.jpg
   ```
5. **刷新页面**：`Ctrl + F5` 强制刷新。
6. **确认**：虚线占位框消失、图片出现，即成功。

如果没出现：检查①文件名大小写与扩展名；②是否放进了 `assets/img/` 而不是外层目录；③浏览器 F12 → Network 里对应文件是否 404。

## 三、合作者头像（可选）

- 放到 `assets/img/people/`，文件名必须与下表一致。
- 不放也行，卡片会自动显示姓名首字母。
- 建议统一为正方形、浅灰或纯色背景，视觉更整齐。

| 姓名 | 文件名 |
| --- | --- |
| Amy Wesolowski | `amy-wesolowski.jpg` |
| Andrew Tatem | `andrew-tatem.jpg` |
| Anna Thorson | `anna-thorson.jpg` |
| Beom Jun Kim | `beom-jun-kim.jpg` |
| Biao Xu | `biao-xu.jpg` |
| Caroline O. Buckee | `caroline-o-buckee.jpg` |
| Christa Brelsford | `christa-brelsford.jpg` |
| Deng Hongzhong | `deng-hongzhong.jpg` |
| Erik Wetter | `erik-wetter.jpg` |
| Fredrik Liljeros | `fredrik-liljeros.jpg` |
| Fuwen Gu | `fuwen-gu.jpg` |
| He Changzheng | `he-changzheng.jpg` |
| Hengjin Dong | `hengjin-dong.jpg` |
| Hoang Huy Thanh | `hoang-huy-thanh.jpg` |
| Huang Zeha | `huang-zeha.jpg` |
| Jens Malmros | `jens-malmros.jpg` |
| Johan von Schreeb | `johan-von-schreeb.jpg` |
| Jun Wu | `jun-wu.jpg` |
| Lars Palm | `lars-palm.jpg` |
| Li Jun | `li-jun.jpg` |
| Li Tan | `li-tan.jpg` |
| Li Yong | `li-yong.jpg` |
| Linus Bengtsson | `linus-bengtsson.jpg` |
| Liwei Cheng | `liwei-cheng.jpg` |
| Mart L. Stein | `mart-l-stein.jpg` |
| Martin Camitz | `martin-camitz.jpg` |
| Nguyen Le Hoang | `nguyen-le-hoang.jpg` |
| Nita Bharti | `nita-bharti.jpg` |
| Petter Holme | `petter-holme.jpg` |
| Qi Zhao | `qi-zhao.jpg` |
| Quoc Cuong Nguyen | `quoc-cuong-nguyen.jpg` |
| Richard Garfield | `richard-garfield.jpg` |
| Shaofa Nie | `shaofa-nie.jpg` |
| Tan Yuejin | `tan-yuejin.jpg` |
| Tao Tao | `tao-tao.jpg` |
| Tom Britton | `tom-britton.jpg` |
| Tuan Anh Nguyen | `tuan-anh-nguyen.jpg` |
| Vinod K. Diwan | `vinod-k-diwan.jpg` |
| Weirong Yan | `weirong-yan.jpg` |

## 四、修改图库说明文字

图库 6 张图的说明在首页源码里：

- 英文：`index.html`，搜 `gallery__item`
- 中文：`index_cn.html`，搜 `gallery__item`

每张图的结构：

```html
<figure class="gallery__item">
  <div class="media gallery__frame is-missing">
    <img src="assets/img/gallery-01.jpg" alt="田野调查">
    ...
  </div>
  <figcaption><span>01</span><span>Fieldwork · Bangladesh — Mobile-network data after cyclone Mahasen</span></figcaption>
</figure>
```

改 `<figcaption>` 里的第二段文字即可；`alt` 也建议一起改成准确描述（利于无障碍与搜索）。

联系页照片说明在 `contact.html` / `contact_cn.html`，搜 `contact-campus`。

## 五、把研究插图换成照片（可选）

研究卡片和研究页目前使用的是生成好的 SVG 插图，本身已经是成品。若想换成真实照片：

1. 准备 5 张 1600×1100 左右的 JPG；
2. 在下面 4 个文件中搜索对应文件名，把 `.svg` 改成 `.jpg`：
   - `index.html`、`index_cn.html`（首页 5 张卡片）
   - `research.html`、`research_cn.html`（研究方向页大图）
   - 文件名：`research-mobility`、`research-networks`、`research-hypergraph`、`research-sampling`、`research-parallel`
3. 把 JPG 放进 `assets/img/`，刷新即可。

示例：

```html
<!-- 改前 -->
<img src="assets/img/research-mobility.svg" alt="Mobility">
<!-- 改后 -->
<img src="assets/img/research-mobility.jpg" alt="Mobility">
```

> 也可以直接用自己的 SVG 覆盖同名文件，这样连 HTML 都不用改。

## 六、增加更多图库位

复制一个完整的 `<figure class="gallery__item">…</figure>`，把 `gallery-01` 改成 `gallery-07`，并把 `<figcaption>` 改成新说明。图库是 3 列自适应网格，会自动排到下一行。

## 七、图片规范与版权

- 格式：JPG（照片）/ SVG（图形）；不要用 PNG 存照片，体积会大 3–5 倍。
- 尺寸：按上表比例；不要把小图放大，会模糊。
- 体积：单张 ≤ 500 KB，整页图片总量建议 ≤ 3 MB。
- 隐私：导出时尽量移除 EXIF/GPS 信息（多数压缩工具可一键去除）。
- 版权：使用自己拍摄、学校宣传部门或已获授权的照片；如使用他人照片，请在图注中署名。
- 人物照：合影与个人头像建议先取得本人同意。

## 八、交付前检查清单

- [ ] `portrait.jpg` 已替换（首页第一眼）
- [ ] `hero.jpg`（可选，但最能提升“高级感”）
- [ ] `gallery-01` ~ `gallery-06`
- [ ] `contact-campus.jpg`
- [ ] 合作者头像（可选，有几个放几个）
- [ ] 图片说明文字已改成真实时间、地点、事件
- [ ] 手机上看一遍（390px 宽），确认没有被裁掉关键人物
