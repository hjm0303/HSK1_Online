/*
  HSK Online - Supabase Auth
  功能：登录、单页注册、老师审核、云端星星、排行榜
*/

(() => {
  "use strict";

  const SUPABASE_URL = "https://fgeyaovfcxisgbxpyaff.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Wo75ScuU-CEQwcrVtOnLvg_fytn_7L7";

  let client = null;
  let currentUser = null;
  let currentProfile = null;
  let currentStars = 0;
  let authBar = null;

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function addStyles() {
    if (document.getElementById("hskAuthStyles")) return;

    const style = document.createElement("style");
    style.id = "hskAuthStyles";
    style.textContent = `
      #hskAuthBar{
        display:flex;align-items:center;justify-content:flex-end;
        gap:7px;flex-wrap:wrap;max-width:580px;margin-left:auto
      }
      .hsk-auth-btn{
        border:1px solid #dfe5ef;border-radius:12px;padding:8px 12px;
        background:#fff;color:#334155;font:800 12px/1.2 "Baloo 2",system-ui,sans-serif;
        cursor:pointer;box-shadow:0 6px 16px rgba(39,48,84,.06);
        transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease
      }
      .hsk-auth-btn:hover{
        transform:translateY(-1px);border-color:#9b8cff;
        box-shadow:0 9px 20px rgba(39,48,84,.10)
      }
      .hsk-auth-primary{
        background:linear-gradient(135deg,#6d5dfc,#8b5cf6);
        color:#fff;border-color:transparent
      }
      .hsk-auth-user{
        display:inline-flex;align-items:center;gap:6px;padding:8px 10px;
        border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;
        color:#475569;font:800 12px/1.2 "Baloo 2",system-ui,sans-serif
      }

      body.hsk-modal-open{overflow:hidden}

      .hsk-modal-overlay{
        position:fixed;inset:0;z-index:100000;
        display:grid;place-items:center;padding:18px;
        background:rgba(15,23,42,.58);
        backdrop-filter:blur(7px);
        -webkit-backdrop-filter:blur(7px)
      }
      .hsk-modal-card{
        position:relative;width:min(520px,100%);
        max-height:92vh;overflow:auto;padding:26px;
        border:1px solid rgba(255,255,255,.9);
        border-radius:26px;background:#fff;
        box-shadow:0 32px 90px rgba(15,23,42,.30);
        animation:hskModalIn .22s ease-out
      }
      @keyframes hskModalIn{
        from{opacity:0;transform:translateY(12px) scale(.97)}
        to{opacity:1;transform:translateY(0) scale(1)}
      }
      .hsk-modal-close{
        position:absolute;right:16px;top:16px;
        width:36px;height:36px;border:0;border-radius:12px;
        display:grid;place-items:center;cursor:pointer;
        color:#64748b;background:#f1f5f9;font-size:21px
      }
      .hsk-modal-close:hover{background:#e2e8f0;color:#334155}
      .hsk-modal-icon{
        width:58px;height:58px;border-radius:19px;
        display:grid;place-items:center;margin-bottom:14px;
        color:#fff;font-size:25px;
        background:linear-gradient(145deg,#6d5dfc,#8b5cf6);
        box-shadow:0 14px 30px rgba(109,93,252,.28)
      }
      .hsk-modal-title{
        margin:0;color:#172033;font-size:27px;font-weight:900;line-height:1.15
      }
      .hsk-modal-subtitle{
        margin:7px 0 20px;color:#718096;
        font-size:14px;font-weight:700;line-height:1.55
      }
      .hsk-form{display:grid;gap:14px}
      .hsk-field{display:grid;gap:7px}
      .hsk-field label{color:#334155;font-size:13px;font-weight:900}
      .hsk-field input{
        width:100%;border:1px solid #dbe3ef;
        border-radius:14px;padding:12px 14px;
        outline:none;background:#f8fafc;color:#172033;
        font:700 14px/1.35 "Baloo 2",system-ui,sans-serif;
        transition:border-color .18s ease,box-shadow .18s ease,background .18s ease
      }
      .hsk-field input:focus{
        background:#fff;border-color:#8b5cf6;
        box-shadow:0 0 0 4px rgba(109,93,252,.12)
      }
      .hsk-field input.hsk-input-error{
        border-color:#fb7185;
        box-shadow:0 0 0 4px rgba(244,63,94,.10)
      }
      .hsk-hint{color:#94a3b8;font-size:11px;font-weight:700}
      .hsk-form-error{
        display:none;padding:10px 12px;border-radius:12px;
        color:#9f1239;background:#fff1f2;border:1px solid #fecdd3;
        font-size:12px;font-weight:800;line-height:1.45
      }
      .hsk-form-error.show{display:block}
      .hsk-submit{
        width:100%;border:0;border-radius:15px;
        padding:13px 18px;cursor:pointer;color:#fff;
        font-size:14px;font-weight:900;
        background:linear-gradient(135deg,#6d5dfc,#8b5cf6);
        box-shadow:0 12px 26px rgba(109,93,252,.26);
        transition:transform .18s ease,box-shadow .18s ease,opacity .18s ease
      }
      .hsk-submit:hover{
        transform:translateY(-1px);
        box-shadow:0 16px 32px rgba(109,93,252,.32)
      }
      .hsk-submit:disabled{cursor:not-allowed;opacity:.65;transform:none}
      .hsk-form-footer{
        margin:13px 0 0;text-align:center;
        color:#94a3b8;font-size:11px;font-weight:700
      }
      .hsk-success{padding:30px 8px 14px;text-align:center}
      .hsk-success-icon{
        width:76px;height:76px;margin:0 auto 15px;
        display:grid;place-items:center;border-radius:24px;
        color:#fff;background:linear-gradient(145deg,#10b981,#22c55e);
        box-shadow:0 16px 34px rgba(16,185,129,.25);
        font-size:34px
      }

      #hskLeaderboardOverlay{
        position:fixed;inset:0;z-index:99999;
        background:rgba(15,23,42,.48);
        display:grid;place-items:center;padding:18px
      }
      #hskLeaderboardCard{
        width:min(560px,100%);max-height:82vh;overflow:auto;
        background:#fff;border-radius:24px;padding:22px;
        box-shadow:0 30px 80px rgba(15,23,42,.28)
      }
      .hsk-rank-row{
        display:grid;grid-template-columns:52px minmax(0,1fr) auto;
        gap:10px;align-items:center;padding:11px 6px;
        border-bottom:1px solid #edf0f6
      }

      @media(max-width:900px){
        #hskAuthBar{order:3;width:100%;max-width:none}
      }
    `;
    document.head.appendChild(style);
  }

  function injectAuthBar() {
    authBar = document.getElementById("hskAuthBar");

    if (authBar) return true;

    const header = document.querySelector(".app-header");
    if (!header) return false;

    authBar = document.createElement("div");
    authBar.id = "hskAuthBar";

    const selectShell = header.querySelector(".select-shell");
    if (selectShell) header.insertBefore(authBar, selectShell);
    else header.appendChild(authBar);

    return true;
  }

  function safeName() {
    return currentProfile?.display_name ||
      currentUser?.email?.split("@")[0] ||
      "HSK 学员";
  }

  function renderAuthBar() {
    if (!authBar) return;

    if (!currentUser) {
      authBar.innerHTML = `
        <button class="hsk-auth-btn hsk-auth-primary" id="hskLoginBtn">登录</button>
        <button class="hsk-auth-btn" id="hskRegisterBtn">注册</button>
      `;

      document.getElementById("hskLoginBtn").onclick = showLoginModal;
      document.getElementById("hskRegisterBtn").onclick = showRegisterModal;
      return;
    }

    const status = currentProfile?.approved ? "✅ 已开放" : "⏳ 待审核";

    authBar.innerHTML = `
      <span class="hsk-auth-user">👤 ${escapeHtml(safeName())}</span>
      <span class="hsk-auth-user">${status}</span>
      <span class="hsk-auth-user">⭐ <b id="hskHeaderStars">${currentStars}</b></span>
      <button class="hsk-auth-btn" id="hskRankBtn">排行榜</button>
      <button class="hsk-auth-btn" id="hskLogoutBtn">退出</button>
    `;

    document.getElementById("hskRankBtn").onclick = showLeaderboard;
    document.getElementById("hskLogoutBtn").onclick = signOut;
  }

  function closeModal() {
    document.querySelector(".hsk-modal-overlay")?.remove();
    document.body.classList.remove("hsk-modal-open");
  }

  function createModal(content) {
    closeModal();

    const overlay = document.createElement("div");
    overlay.className = "hsk-modal-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML = `<div class="hsk-modal-card">${content}</div>`;

    document.body.appendChild(overlay);
    document.body.classList.add("hsk-modal-open");

    overlay.addEventListener("click", event => {
      if (event.target === overlay) closeModal();
    });

    const closeButton = overlay.querySelector(".hsk-modal-close");
    if (closeButton) closeButton.onclick = closeModal;

    return overlay;
  }

  function friendlyError(error, mode) {
    const message = String(error?.message || "");

    if (/already registered|already been registered/i.test(message)) {
      return "这个邮箱已经注册，请直接登录。";
    }

    if (/invalid email/i.test(message)) {
      return "邮箱格式不正确，请重新填写。";
    }

    if (/invalid login credentials/i.test(message)) {
      return "邮箱或密码不正确。";
    }

    if (/password/i.test(message) && /weak|least|short/i.test(message)) {
      return "密码强度不足，请至少输入6位字符。";
    }

    if (/rate limit/i.test(message)) {
      return "操作太频繁，请稍等一会儿再试。";
    }

    return message ? `${mode}失败：${message}` : `${mode}失败，请检查网络后重试。`;
  }

  function showRegisterModal() {
    const overlay = createModal(`
      <button type="button" class="hsk-modal-close" aria-label="关闭">×</button>
      <div class="hsk-modal-icon">👤</div>
      <h2 class="hsk-modal-title">创建学习账号</h2>
      <p class="hsk-modal-subtitle">
        请一次填写完整资料。注册后等待老师审核即可进入锁定课程。
      </p>

      <form id="hskRegisterForm" class="hsk-form" novalidate>
        <div class="hsk-field">
          <label for="hskRegisterName">学生姓名</label>
          <input id="hskRegisterName" type="text" maxlength="60"
                 autocomplete="name" placeholder="例如：王小明" required>
        </div>

        <div class="hsk-field">
          <label for="hskRegisterEmail">登录邮箱</label>
          <input id="hskRegisterEmail" type="email"
                 autocomplete="email" placeholder="student@example.com" required>
        </div>

        <div class="hsk-field">
          <label for="hskRegisterPassword">设置密码</label>
          <input id="hskRegisterPassword" type="password" minlength="6"
                 autocomplete="new-password" placeholder="至少6位字符" required>
          <span class="hsk-hint">建议使用字母和数字组合。</span>
        </div>

        <div class="hsk-field">
          <label for="hskRegisterConfirm">确认密码</label>
          <input id="hskRegisterConfirm" type="password" minlength="6"
                 autocomplete="new-password" placeholder="再次输入密码" required>
        </div>

        <div id="hskRegisterError" class="hsk-form-error" aria-live="polite"></div>

        <button id="hskRegisterSubmit" class="hsk-submit" type="submit">
          确认注册
        </button>
      </form>

      <p class="hsk-form-footer">
        注册后，老师在 Supabase 中把 approved 改为 true 即可开放课程。
      </p>
    `);

    const form = overlay.querySelector("#hskRegisterForm");
    const nameInput = overlay.querySelector("#hskRegisterName");
    const emailInput = overlay.querySelector("#hskRegisterEmail");
    const passwordInput = overlay.querySelector("#hskRegisterPassword");
    const confirmInput = overlay.querySelector("#hskRegisterConfirm");
    const errorBox = overlay.querySelector("#hskRegisterError");
    const submitButton = overlay.querySelector("#hskRegisterSubmit");
    const inputs = [nameInput, emailInput, passwordInput, confirmInput];

    function clearError() {
      errorBox.textContent = "";
      errorBox.classList.remove("show");
      inputs.forEach(input => input.classList.remove("hsk-input-error"));
    }

    function showError(message, input = null) {
      clearError();
      errorBox.textContent = message;
      errorBox.classList.add("show");

      if (input) {
        input.classList.add("hsk-input-error");
        input.focus();
      }
    }

    inputs.forEach(input => input.addEventListener("input", clearError));

    form.addEventListener("submit", async event => {
      event.preventDefault();
      clearError();

      const displayName = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmInput.value;

      if (!displayName) {
        showError("请输入学生姓名。", nameInput);
        return;
      }

      if (!email || !emailInput.validity.valid) {
        showError("请输入正确的邮箱地址。", emailInput);
        return;
      }

      if (password.length < 6) {
        showError("密码至少需要6位字符。", passwordInput);
        return;
      }

      if (password !== confirmPassword) {
        showError("两次输入的密码不一致。", confirmInput);
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = "正在注册…";

      const { error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName
          }
        }
      });

      if (error) {
        submitButton.disabled = false;
        submitButton.textContent = "确认注册";
        showError(friendlyError(error, "注册"));
        return;
      }

      await refreshAuthState();

      const card = overlay.querySelector(".hsk-modal-card");
      card.innerHTML = `
        <div class="hsk-success">
          <div class="hsk-success-icon">✓</div>
          <h2 class="hsk-modal-title">注册成功</h2>
          <p class="hsk-modal-subtitle" style="margin-bottom:0">
            账号目前为“待审核”。老师审核通过后即可进入锁定课程。
          </p>
        </div>
      `;

      setTimeout(closeModal, 1700);
    });

    setTimeout(() => nameInput.focus(), 50);
  }

  function showLoginModal() {
    const overlay = createModal(`
      <button type="button" class="hsk-modal-close" aria-label="关闭">×</button>
      <div class="hsk-modal-icon">🔐</div>
      <h2 class="hsk-modal-title">登录学习账号</h2>
      <p class="hsk-modal-subtitle">输入注册邮箱和密码继续学习。</p>

      <form id="hskLoginForm" class="hsk-form" novalidate>
        <div class="hsk-field">
          <label for="hskLoginEmail">登录邮箱</label>
          <input id="hskLoginEmail" type="email"
                 autocomplete="email" placeholder="student@example.com" required>
        </div>

        <div class="hsk-field">
          <label for="hskLoginPassword">密码</label>
          <input id="hskLoginPassword" type="password"
                 autocomplete="current-password" placeholder="输入密码" required>
        </div>

        <div id="hskLoginError" class="hsk-form-error" aria-live="polite"></div>

        <button id="hskLoginSubmit" class="hsk-submit" type="submit">
          登录
        </button>
      </form>
    `);

    const form = overlay.querySelector("#hskLoginForm");
    const emailInput = overlay.querySelector("#hskLoginEmail");
    const passwordInput = overlay.querySelector("#hskLoginPassword");
    const errorBox = overlay.querySelector("#hskLoginError");
    const submitButton = overlay.querySelector("#hskLoginSubmit");

    form.addEventListener("submit", async event => {
      event.preventDefault();

      errorBox.textContent = "";
      errorBox.classList.remove("show");

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!email || !emailInput.validity.valid) {
        errorBox.textContent = "请输入正确的邮箱地址。";
        errorBox.classList.add("show");
        emailInput.focus();
        return;
      }

      if (!password) {
        errorBox.textContent = "请输入密码。";
        errorBox.classList.add("show");
        passwordInput.focus();
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = "正在登录…";

      const { error } = await client.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        submitButton.disabled = false;
        submitButton.textContent = "登录";
        errorBox.textContent = friendlyError(error, "登录");
        errorBox.classList.add("show");
        return;
      }

      await refreshAuthState();
      closeModal();
    });

    setTimeout(() => emailInput.focus(), 50);
  }

  async function refreshAuthState() {
    const { data, error } = await client.auth.getSession();

    if (error) {
      console.error("读取登录状态失败：", error);
      currentUser = null;
      currentProfile = null;
      currentStars = 0;
      renderAuthBar();
      return;
    }

    currentUser = data.session?.user || null;
    currentProfile = null;
    currentStars = 0;

    if (currentUser) {
      const [profileResult, scoreResult] = await Promise.all([
        client
          .from("profiles")
          .select("display_name, approved")
          .eq("id", currentUser.id)
          .single(),
        client
          .from("user_scores")
          .select("stars")
          .eq("user_id", currentUser.id)
          .single()
      ]);

      if (!profileResult.error) currentProfile = profileResult.data;
      if (!scoreResult.error) {
        currentStars = Number(scoreResult.data?.stars || 0);
      }
    }

    renderAuthBar();
    sendStarsToLesson();
  }

  async function signOut() {
    await client.auth.signOut();
    currentUser = null;
    currentProfile = null;
    currentStars = 0;
    renderAuthBar();
    sendStarsToLesson();
  }

  async function canOpenLockedLesson() {
    await refreshAuthState();

    if (!currentUser) {
      alert("这是一节锁定课程，请先登录。");
      showLoginModal();
      return false;
    }

    if (!currentProfile?.approved) {
      alert("你的账号正在等待老师审核，暂时不能进入锁定课程。");
      return false;
    }

    return true;
  }

  async function addStars(amount) {
    if (!currentUser) return;

    const safeAmount = Math.floor(Number(amount));
    if (!Number.isFinite(safeAmount) || safeAmount < 1 || safeAmount > 20) {
      return;
    }

    const { data, error } = await client.rpc("add_user_stars", {
      p_amount: safeAmount
    });

    if (error) {
      console.error("保存星星失败：", error);
      return;
    }

    currentStars = Number(data || 0);

    const starElement = document.getElementById("hskHeaderStars");
    if (starElement) starElement.textContent = currentStars;

    sendStarsToLesson();
  }

  function sendStarsToLesson() {
    const iframe = document.getElementById("lessonIframe");
    if (!iframe?.contentWindow) return;

    iframe.contentWindow.postMessage(
      {
        type: "HSK_SET_TOTAL_STARS",
        stars: currentStars
      },
      window.location.origin
    );
  }

  async function showLeaderboard() {
    if (!currentUser) {
      showLoginModal();
      return;
    }

    const { data, error } = await client
      .from("user_scores")
      .select("stars, profiles!inner(display_name, approved)")
      .order("stars", { ascending: false })
      .limit(50);

    if (error) {
      alert("排行榜读取失败：" + error.message);
      return;
    }

    const rows = (data || []).filter(item => {
      const profile = Array.isArray(item.profiles)
        ? item.profiles[0]
        : item.profiles;
      return profile?.approved;
    });

    document.getElementById("hskLeaderboardOverlay")?.remove();

    const overlay = document.createElement("div");
    overlay.id = "hskLeaderboardOverlay";

    const card = document.createElement("div");
    card.id = "hskLeaderboardCard";

    const title = document.createElement("h2");
    title.textContent = "🏆 HSK Online 星星排行榜";
    title.style.cssText =
      "margin:0 0 6px;font-size:24px;font-weight:900;color:#172033";

    const note = document.createElement("p");
    note.textContent = "只显示已经通过老师审核的学生";
    note.style.cssText =
      "margin:0 0 14px;color:#718096;font-weight:700";

    card.append(title, note);

    if (!rows.length) {
      const empty = document.createElement("p");
      empty.textContent = "目前还没有排行榜记录。";
      empty.style.cssText =
        "padding:25px;text-align:center;color:#718096";
      card.appendChild(empty);
    } else {
      rows.forEach((item, index) => {
        const profile = Array.isArray(item.profiles)
          ? item.profiles[0]
          : item.profiles;

        const row = document.createElement("div");
        row.className = "hsk-rank-row";

        const rank = document.createElement("strong");
        rank.textContent =
          index < 3 ? ["🥇", "🥈", "🥉"][index] : `${index + 1}.`;

        const name = document.createElement("span");
        name.textContent = profile?.display_name || "HSK 学员";
        name.style.fontWeight = "800";

        const stars = document.createElement("strong");
        stars.textContent = `⭐ ${Number(item.stars || 0)}`;

        row.append(rank, name, stars);
        card.appendChild(row);
      });
    }

    const close = document.createElement("button");
    close.className = "hsk-auth-btn hsk-auth-primary";
    close.textContent = "关闭";
    close.style.cssText = "margin-top:18px;width:100%;padding:11px";
    close.onclick = () => overlay.remove();

    card.appendChild(close);
    overlay.appendChild(card);

    overlay.onclick = event => {
      if (event.target === overlay) overlay.remove();
    };

    document.body.appendChild(overlay);
  }

  function init() {
    addStyles();

    if (!window.supabase || !window.supabase.createClient) {
      console.error("Supabase SDK 未加载。请检查 index.html 中的 CDN 脚本。");
      return;
    }

    client = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );

    if (!injectAuthBar()) {
      console.error("没有找到 .app-header，无法显示登录注册按钮。");
      return;
    }

    renderAuthBar();
    refreshAuthState();

    client.auth.onAuthStateChange(() => {
      setTimeout(refreshAuthState, 0);
    });
  }

  window.addEventListener("message", event => {
    if (event.origin !== window.location.origin) return;

    const iframe = document.getElementById("lessonIframe");
    if (!iframe || event.source !== iframe.contentWindow) return;

    if (event.data?.type === "HSK_ADD_STARS") {
      addStars(event.data.amount);
    }

    if (event.data?.type === "HSK_LESSON_READY") {
      sendStarsToLesson();
    }
  });

  window.HSKAuth = {
    refreshAuthState,
    signOut,
    canOpenLockedLesson,
    addStars,
    showLeaderboard,
    showRegisterModal,
    showLoginModal
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
