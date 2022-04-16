let toggle = document.getElementById('enable_shorts_redirect');
chrome.storage.local.get(['enable'], (result) => toggle.checked = result.enable);
toggle.addEventListener('change', () => chrome.storage.local.set({enable: toggle.checked}));