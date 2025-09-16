// Supabase 配置
// 请将以下配置替换为您的 Supabase 项目信息
// 您可以在 Supabase 控制台的 Settings > API 中找到这些信息

export const supabaseConfig = {
    // 您的 Supabase 项目 URL
    url: 'YOUR_SUPABASE_URL', // 例如: 'https://your-project.supabase.co'
    
    // 您的 Supabase 匿名密钥 (anon key)
    anonKey: 'YOUR_SUPABASE_ANON_KEY', // 例如: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};

// 使用说明:
// 1. 访问 https://supabase.com/dashboard
// 2. 选择您的项目或创建新项目
// 3. 进入 Settings > API
// 4. 复制 Project URL 和 Project API keys 中的 anon public
// 5. 将上面的 YOUR_SUPABASE_URL 和 YOUR_SUPABASE_ANON_KEY 替换为实际值

// 注意: 请确保不要将此文件提交到公共代码仓库中，或者使用环境变量来管理敏感信息