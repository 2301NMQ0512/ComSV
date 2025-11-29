const universityData = {
    'khu1': [{name: 'Đại học Bách Khoa HN'}, {name: 'Đại học Kinh Tế Quốc Dân'}, {name: 'Đại học Xây Dựng'}],
    'khu2': [{name: 'Đại học Quốc Gia HN'}, {name: 'Đại học Sư Phạm HN'}, {name: 'Học viện Báo Chí'}],
    'khu3': [{name: 'Đại học Kiến Trúc HN'}, {name: 'Học viện Bưu Chính'}, {name: 'Học viện An Ninh'}],
    'khu4': [{name: 'Đại học Ngoại Thương'}, {name: 'Học viện Ngoại Giao'}, {name: 'Đại học Luật HN'}]
};
const areaNames = { 'khu1': 'Khu 1: Bách - Kinh - Xây', 'khu2': 'Khu 2: Cầu Giấy', 'khu3': 'Khu 3: Hà Đông', 'khu4': 'Khu 4: Chùa Láng' };

const qualityDB = {
    'Quán Ăn Vặt Bách Kinh Xây': {
        score: 95, grade: 'A', color: '#27ae60',
        certs: ['VSATTP', 'ISO 22000'],
        criteria: { 'Vệ sinh bếp': 98, 'Nguồn gốc': 95, 'Quy trình': 92, 'Bảo quản': 96, 'Nhân viên': 94 },
        history: [{date: '01/11/2025', score: 95, who: 'ComSV Team'}, {date: '15/10/2025', score: 93, who: 'Sở Y Tế'}]
    },
    'Quán Ăn Cầu Giấy': {
        score: 88, grade: 'B', color: '#2980b9',
        certs: ['VSATTP'],
        criteria: { 'Vệ sinh bếp': 85, 'Nguồn gốc': 90, 'Quy trình': 88, 'Bảo quản': 85, 'Nhân viên': 90 },
        history: [{date: '02/11/2025', score: 88, who: 'ComSV Team'}]
    },
    'Quán Cơm Hà Đông': {
        score: 92, grade: 'A', color: '#27ae60',
        certs: ['VSATTP', 'Bếp Sạch'],
        criteria: { 'Vệ sinh bếp': 90, 'Nguồn gốc': 95, 'Quy trình': 93, 'Bảo quản': 90, 'Nhân viên': 92 },
        history: [{date: '03/11/2025', score: 92, who: 'ComSV Team'}]
    },
    'Quán Ngon Chùa Láng': {
        score: 97, grade: 'A', color: '#27ae60',
        certs: ['VSATTP', 'ISO', 'HACCP'],
        criteria: { 'Vệ sinh bếp': 99, 'Nguồn gốc': 98, 'Quy trình': 96, 'Bảo quản': 97, 'Nhân viên': 95 },
        history: [{date: '05/11/2025', score: 97, who: 'Thanh Tra'}]
    }
};

function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const link = document.querySelector(`[data-page="${pageId}"]`);
    if(link) link.classList.add('active');
    window.scrollTo(0, 0);
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => { e.preventDefault(); navigateTo(link.dataset.page); });
});

document.querySelectorAll('.area-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.area-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.area-content').forEach(c => c.classList.remove('active'));
        document.getElementById(tab.dataset.area).classList.add('active');
    });
});

function openQualityModal(name, type) {
    const data = qualityDB[name];
    if(!data) return;
    document.getElementById('modalTitle').innerText = name;
    document.getElementById('modalScoreVal').innerText = data.score;
    document.getElementById('modalScoreCircle').style.background = data.color;
    document.getElementById('modalGrade').innerText = 'Hạng ' + data.grade;
    document.getElementById('modalGrade').style.color = data.color;

    const certsHTML = data.certs.map(c => `<span class="cert-tag"> 📜  ${c}</span>`).join('');
    document.getElementById('modalCerts').innerHTML = certsHTML;

    let criteriaHTML = '';
    for (const [key, val] of Object.entries(data.criteria)) {
        criteriaHTML += `
        <div class="criteria-item">
            <div class="criteria-top"><span>${key}</span><span>${val}/100</span></div>
            <div class="progress-bg"><div class="progress-fill" style="width:${val}%; background:${data.color}"></div></div>
        </div>`;
    }
    document.getElementById('modalCriteriaList').innerHTML = criteriaHTML;

    const histHTML = data.history.map(h => `
        <div class="history-item" style="border-left-color: ${data.color}">
            <div><strong>${h.date}</strong></div>
            <div style="color:${data.color}; font-weight:bold;">${h.score} điểm</div>
            <div style="color:#666;">${h.who}</div>
        </div>
    `).join('');
    document.getElementById('modalHistory').innerHTML = histHTML;
    document.getElementById('qualityModal').style.display = 'block';
}

function closeQualityModal() {
    document.getElementById('qualityModal').style.display = 'none';
}

let currentOrder = { meal: '', price: 0, area: '', pickup: '' };

function orderMeal(mealName, price, areaKey) {
    currentOrder.meal = mealName;
    currentOrder.price = price;
    currentOrder.area = areaKey;

    document.getElementById('displayMealName').textContent = mealName;
    document.getElementById('displayPrice').textContent = price.toLocaleString() + 'đ';
    document.getElementById('displayAreaName').textContent = areaNames[areaKey];

    const container = document.getElementById('pickupPointsContainer');
    container.innerHTML = '';

    if (universityData[areaKey]) {
        universityData[areaKey].forEach(uni => {
            const div = document.createElement('div');
            div.className = 'pickup-point';
            div.innerHTML = ` 🎓  ${uni.name}`;
            div.onclick = () => {
                document.querySelectorAll('.pickup-point').forEach(el => el.classList.remove('selected'));
                div.classList.add('selected');
                currentOrder.pickup = uni.name;
            };
            container.appendChild(div);
        });
    }
    navigateTo('order');
}

function submitOrder() {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    if (!name || !phone) { alert('Vui lòng nhập tên và số điện thoại!'); return; }
    if (!currentOrder.pickup) { alert('Vui lòng chọn trường đại học để nhận hàng!'); return; }

    const overlay = document.getElementById('successOverlay');
    overlay.style.display = 'flex';

    document.getElementById('trackingOrderId').textContent = '#SV' + Math.floor(Math.random() * 10000);
    document.getElementById('trackingLocation').textContent = currentOrder.pickup;

    setTimeout(() => {
        overlay.style.display = 'none';
        navigateTo('tracking');
        startTrackingSimulation();
    }, 2500);
}

function startTrackingSimulation() {
    const steps = ['track-step-1', 'track-step-2', 'track-step-3', 'track-step-4'];
    let current = 0;
    steps.forEach(id => { const el = document.getElementById(id); el.className = 'timeline-step'; });
    document.getElementById(steps[0]).classList.add('active');

    const interval = setInterval(() => {
        current++;
        if (current < steps.length) {
            document.getElementById(steps[current-1]).classList.remove('active');
            document.getElementById(steps[current-1]).classList.add('completed');
            document.getElementById(steps[current]).classList.add('active');
        } else {
            document.getElementById(steps[current-1]).classList.remove('active');
            document.getElementById(steps[current-1]).classList.add('completed');
            document.getElementById('btnBackHome').style.display = 'block';
            clearInterval(interval);
        }
    }, 3000);
}

window.onclick = function(event) {
    if (event.target == document.getElementById('qualityModal')) closeQualityModal();
}