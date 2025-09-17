# Supabase 登录页面

一个使用 Supabase 认证服务的现代化登录页面，支持邮箱密码登录、注册和 Google 社交登录。

## 功能特性

- ✨ 现代化的 UI 设计
- 🔐 邮箱密码登录/注册
- 🌐 Google OAuth 登录
- 📱 响应式设计，支持移动端
- 🎨 美观的动画效果
- ⚡ 实时表单验证
- 🔔 用户友好的错误提示

## 快速开始

### 1. 配置 Supabase

1. 访问 [Supabase 控制台](https://supabase.com/dashboard)
2. 创建新项目或选择现有项目
3. 进入 `Settings` > `API`
4. 复制以下信息：
   - Project URL
   - Project API keys 中的 `anon public` 密钥

### 2. 更新配置文件

编辑 `config.js` 文件，将以下占位符替换为您的实际配置：

```javascript
export const supabaseConfig = {
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key-here',
};
```

### 3. 配置认证设置

#### 设置回调 URL
1. 进入 Supabase 控制台的 `Authentication` > `URL Configuration`
2. 在 `Site URL` 中添加：`http://localhost:3000`
3. 在 `Redirect URLs` 中添加以下 URL：
   - `http://localhost:3000`
   - `http://127.0.0.1:3000`
   - `https://nrzplyouhjzbeqvsnebq.supabase.co/auth/v1/callback`

#### 启用认证提供商（可选）
如果要使用 Google 登录，需要在 Supabase 控制台中配置：

1. 进入 `Authentication` > `Providers`
2. 启用 Google 提供商
3. 配置 Google OAuth 客户端 ID 和密钥
4. 确保在 Google Cloud Console 中添加了正确的重定向 URI

### 4. 安装依赖并运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

然后在浏览器中访问 `http://localhost:3000`

## 项目结构

```
├── index.html          # 主页面
├── styles.css          # 样式文件
├── app.js             # 主要 JavaScript 逻辑
├── config.js          # Supabase 配置
├── package.json       # 项目依赖
└── README.md          # 项目说明
```

## 使用说明

### 登录
- 输入已注册的邮箱和密码
- 点击"登录"按钮
- 支持"记住我"功能

### 注册
- 切换到"注册"标签
- 输入邮箱和密码（至少8位）
- 确认密码
- 点击"创建账户"
- 检查邮箱中的确认链接

### Google 登录
- 点击"使用 Google 登录"按钮
- 在弹出窗口中完成 Google 认证

## 自定义

### 修改样式
编辑 `styles.css` 文件来自定义外观：
- 修改颜色主题
- 调整布局和间距
- 添加自定义动画

### 添加功能
在 `app.js` 中可以添加：
- 忘记密码功能
- 更多社交登录选项
- 用户资料管理
- 登录后的页面跳转

## 安全注意事项

1. **不要将敏感信息提交到公共仓库**
   - 将 `config.js` 添加到 `.gitignore`
   - 使用环境变量管理敏感配置

2. **启用行级安全策略 (RLS)**
   - 在 Supabase 中为数据表启用 RLS
   - 设置适当的安全策略

3. **配置正确的重定向 URL**
   - 在 Supabase 认证设置中添加允许的重定向 URL

## 故障排除

### 常见问题

1. **"Supabase 未初始化" 错误**
   - 检查 `config.js` 中的配置是否正确
   - 确保 URL 和密钥没有多余的空格

2. **Google 登录失败**
   - 确保在 Supabase 中启用了 Google 提供商
   - 检查 OAuth 配置是否正确

3. **邮箱确认问题**
   - 检查垃圾邮件文件夹
   - 确保邮箱地址正确

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **认证**: Supabase Auth
- **样式**: 自定义 CSS，响应式设计
- **字体**: Inter (Google Fonts)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！