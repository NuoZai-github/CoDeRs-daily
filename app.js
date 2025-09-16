import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js@2';
import { supabaseConfig } from './config.js';

// 初始化 Supabase 客户端
let supabase;

// 检查配置是否已设置
function checkConfig() {
    if (supabaseConfig.url === 'YOUR_SUPABASE_URL' || supabaseConfig.anonKey === 'YOUR_SUPABASE_ANON_KEY') {
        showMessage('请先在 config.js 文件中配置您的 Supabase 项目信息', 'error');
        return false;
    }
    return true;
}

// 初始化应用
function initApp() {
    if (!checkConfig()) {
        return;
    }
    
    try {
        supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);
        console.log('Supabase 客户端初始化成功');
        
        // 检查用户是否已登录
        checkAuthState();
        
    } catch (error) {
        console.error('Supabase 初始化失败:', error);
        showMessage('初始化失败，请检查配置信息', 'error');
    }
}

// 检查认证状态
async function checkAuthState() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            // 用户已登录，可以重定向到主页面
            showMessage(`欢迎回来，${user.email}！`, 'success');
            console.log('当前用户:', user);
        }
    } catch (error) {
        console.error('检查认证状态失败:', error);
    }
}

// 显示消息
function showMessage(text, type = 'info') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    messageEl.style.display = 'block';
    
    // 3秒后自动隐藏成功消息
    if (type === 'success') {
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }
}

// 切换表单标签
function switchTab(tabName) {
    // 更新标签按钮状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // 更新表单显示
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(`${tabName}-form`).classList.add('active');
    
    // 清除消息
    document.getElementById('message').style.display = 'none';
}

// 登录功能
async function handleLogin(email, password) {
    if (!supabase) {
        showMessage('Supabase 未初始化', 'error');
        return;
    }
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            throw error;
        }

        showMessage('登录成功！', 'success');
        console.log('登录成功:', data);
        
        // 这里可以重定向到主页面
        // window.location.href = '/dashboard.html';
        
    } catch (error) {
        console.error('登录失败:', error);
        let errorMessage = '登录失败';
        
        if (error.message.includes('Invalid login credentials')) {
            errorMessage = '邮箱或密码错误';
        } else if (error.message.includes('Email not confirmed')) {
            errorMessage = '请先验证您的邮箱';
        }
        
        showMessage(errorMessage, 'error');
    }
}

// 注册功能
async function handleSignup(email, password, confirmPassword) {
    if (!supabase) {
        showMessage('Supabase 未初始化', 'error');
        return;
    }
    
    // 验证密码
    if (password !== confirmPassword) {
        showMessage('两次输入的密码不一致', 'error');
        return;
    }
    
    if (password.length < 8) {
        showMessage('密码至少需要8位字符', 'error');
        return;
    }
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            throw error;
        }

        if (data.user && !data.user.email_confirmed_at) {
            showMessage('注册成功！请检查您的邮箱并点击确认链接', 'success');
        } else {
            showMessage('注册成功！', 'success');
        }
        
        console.log('注册成功:', data);
        
    } catch (error) {
        console.error('注册失败:', error);
        let errorMessage = '注册失败';
        
        if (error.message.includes('User already registered')) {
            errorMessage = '该邮箱已被注册';
        } else if (error.message.includes('Password should be at least')) {
            errorMessage = '密码强度不够';
        }
        
        showMessage(errorMessage, 'error');
    }
}

// Google 登录
async function handleGoogleLogin() {
    if (!supabase) {
        showMessage('Supabase 未初始化', 'error');
        return;
    }
    
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) {
            throw error;
        }
        
        console.log('Google 登录启动:', data);
        
    } catch (error) {
        console.error('Google 登录失败:', error);
        showMessage('Google 登录失败', 'error');
    }
}

// 设置按钮加载状态
function setButtonLoading(button, loading) {
    if (loading) {
        button.disabled = true;
        button.classList.add('loading');
        button.dataset.originalText = button.textContent;
        button.textContent = '处理中...';
    } else {
        button.disabled = false;
        button.classList.remove('loading');
        button.textContent = button.dataset.originalText || button.textContent;
    }
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化应用
    initApp();
    
    // 标签切换事件
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchTab(e.target.dataset.tab);
        });
    });
    
    // 登录表单提交
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        setButtonLoading(submitBtn, true);
        await handleLogin(email, password);
        setButtonLoading(submitBtn, false);
    });
    
    // 注册表单提交
    document.getElementById('signup-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        setButtonLoading(submitBtn, true);
        await handleSignup(email, password, confirmPassword);
        setButtonLoading(submitBtn, false);
    });
    
    // Google 登录按钮
    document.querySelector('.google-btn').addEventListener('click', async (e) => {
        const btn = e.currentTarget;
        setButtonLoading(btn, true);
        await handleGoogleLogin();
        setButtonLoading(btn, false);
    });
    
    // 监听认证状态变化
    if (supabase) {
        supabase.auth.onAuthStateChange((event, session) => {
            console.log('认证状态变化:', event, session);
            
            if (event === 'SIGNED_IN') {
                showMessage('登录成功！', 'success');
            } else if (event === 'SIGNED_OUT') {
                showMessage('已退出登录', 'info');
            }
        });
    }
});