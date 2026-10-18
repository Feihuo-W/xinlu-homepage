# 部署到 GitHub Pages

本站是纯静态站点：没有后端、没有数据库、字体与图片都在本地，**可以直接用 GitHub Pages 免费发布**。

最终链接有两种形式：

- 项目站点：`https://<用户名>.github.io/<仓库名>/`
- 用户站点：仓库名必须是 `<用户名>.github.io`，链接为 `https://<用户名>.github.io/`

> 免费账号的 Pages 需要仓库为 **Public**。本站内容本来就是公开主页，通常没有问题。

---

## 方法一：网页上传（最快，不需要装软件）

1. 登录 GitHub，右上角 **+ → New repository**。
2. 填写：
   - Repository name：`xinlu-homepage`（或任意英文名）
   - 选择 **Public**
   - 不要勾选 “Add a README file”
3. 点 **Create repository**。
4. 在新仓库页面点 **uploading an existing file**（或 **Add file → Upload files**）。
5. 打开解压后的 `xinlu-homepage` 文件夹，**全选里面的内容**（Ctrl+A），拖进浏览器上传区。
   - 注意：拖的是**文件夹里面的文件**，不是 `xinlu-homepage` 文件夹本身。
   - 上传完成后，列表里应该直接看到 `index.html`、`assets/`，而不是 `xinlu-homepage/index.html`。
6. 在下方 Commit changes 填 `Initial site`，点 **Commit changes**。
7. 进入 **Settings → Pages**：
   - Source 选 **Deploy from a branch**
   - Branch 选 **main**，目录选 **/ (root)**
   - 点 **Save**
8. 等 1–2 分钟，刷新 Settings → Pages，顶部会出现：
   `Your site is live at https://<用户名>.github.io/xinlu-homepage/`
9. 用无痕窗口打开链接，检查首页、中文切换、论文筛选、手机端。

> `.nojekyll` 文件已经放在包里，用来关闭 Jekyll 处理；如果网页上传时漏掉了它，可以在仓库里 **Add file → Create new file**，文件名填 `.nojekyll`，内容留空，提交即可。

## 方法二：GitHub Desktop（以后经常换图推荐）

1. 安装 [GitHub Desktop](https://desktop.github.com/) 并登录。
2. **File → New repository**，Name 填 `xinlu-homepage`，选择本地目录，Create。
3. 把 `xinlu-homepage` 文件夹里的**内容**复制到刚创建的本地仓库目录。
4. GitHub Desktop 会列出变更；Summary 填 `Initial site`，点 **Commit to main**。
5. 点 **Publish repository**；如果希望免费使用 Pages，取消勾选 “Keep this code private”。
6. 打开 GitHub 网页 → **Settings → Pages**，按方法一第 7 步设置。
7. 以后换图：把图片放进 `assets/img/`，Desktop 里 Commit → Push，等 1 分钟自动更新。

## 方法三：命令行（熟悉 git 的话）

```bash
cd xinlu-homepage
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<用户名>/xinlu-homepage.git
git push -u origin main
```

然后在网页端 Settings → Pages 里选择 `main` / `(root)`。

---

## 更新内容

- 换图：把图片放进 `assets/img/`（合作者头像放 `assets/img/people/`），提交后等 1–2 分钟，`Ctrl + F5` 强刷。
- 改文字：直接编辑对应 `.html` 或 `assets/data.js`，提交即可。
- 不要删除 `.nojekyll`。
- 每次提交都会触发一次 Pages 构建，通常 30–90 秒。

## 常见问题

| 现象 | 原因与处理 |
| --- | --- |
| 打开是 404 或文件列表 | `index.html` 不在仓库根目录。把内容移到根目录，不能放在 `xinlu-homepage/` 子文件夹里 |
| 页面没有样式 | `assets/css/style.css` 路径或大小写不对；GitHub 区分大小写 |
| 图片不显示 | 文件名与 IMAGES.md 不一致；确认是小写 `.jpg` |
| Pages 一直没有发布 | Settings 里分支/目录选错；到 **Actions** 看构建日志；免费账号需 Public 仓库 |
| 更新后还是旧页面 | CDN 缓存，等几分钟并 `Ctrl + F5` |
| 国内访问慢或打不开 | `github.io` 在部分地区不稳定；见下方“备选方案” |

## 自定义域名（可选）

1. 准备一个域名（如 `xinlu.org`）。
2. 仓库 **Settings → Pages → Custom domain** 填入域名并 Save（会生成 `CNAME` 文件）。
3. 在域名服务商配置 DNS：
   - 根域名：A 记录指向 `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
   - `www`：CNAME 指向 `<用户名>.github.io`
4. 等 DNS 生效后，在 Pages 里勾选 **Enforce HTTPS**。

## 备选方案（如果 GitHub 访问不稳定）

同一份文件夹可以直接拖到以下静态托管，均无需改代码：

- **Netlify Drop**：<https://app.netlify.com/drop>，拖进去即得链接
- **Cloudflare Pages**
- **Vercel**
- 学校服务器 / 阿里云 OSS / 腾讯云 COS（国内访问更稳，但可能涉及备案）

## 发布前检查

- [ ] 仓库根目录能看到 `index.html` 和 `assets/`
- [ ] Settings → Pages 显示 “Your site is live”
- [ ] 无痕窗口打开链接，中英文都能切换
- [ ] 手机宽度下布局正常
- [ ] 论文筛选、新闻年份、合作者搜索可用
- [ ] 图片位按需替换（见 IMAGES.md）
- [ ] 确认单位地址、邮箱、荣誉措辞可以公开
