// ===================================================
// 1. DỮ LIỆU & CẤU HÌNH (DATA & CONFIG)
// ===================================================

// Dữ liệu các trường đại học theo 5 khu vực
const universityData = {
    'khu1': [{name: 'Đại học Bách Khoa HN'}, {name: 'Đại học Kinh Tế Quốc Dân'}, {name: 'Đại học Xây Dựng'}],
    'khu2': [{name: 'Đại học Quốc Gia HN'}, {name: 'Đại học Sư Phạm HN'}, {name: 'Học viện Báo Chí'}],
    'khu3': [{name: 'Đại học Kiến Trúc HN'}, {name: 'Học viện Bưu Chính'}, {name: 'Học viện An Ninh'}],
    'khu4': [{name: 'Đại học Ngoại Thương'}, {name: 'Học viện Ngoại Giao'}, {name: 'Đại học Luật HN'}],
    'khu5': [{name: 'Trung tâm GDQP-AN'}, {name: 'Khu Đô thị ĐHQGHN'}, {name: 'ĐH Công Nghệ - CS2'}]
};

// Dữ liệu đánh giá chất lượng của các quán ăn
const qualityDB = {
    'Quán Ăn Vặt Bách Kinh Xây': { 
        score: 95, grade: 'A', color: '#27ae60', 
        certs: ['VSATTP', 'ISO 22000'], 
        criteria: { 'Vệ sinh bếp': 98, 'Nguồn gốc': 95, 'Quy trình': 92, 'Bảo quản': 96, 'Nhân viên': 94 }, 
        history: [{date: '01/11/2025', score: 95, who: 'ComSV Team'}] 
    },
    'Quán Ăn Cầu Giấy': { 
        score: 88, grade: 'B', color: '#2980b9', 
        certs: ['VSATTP'], 
        criteria: { 'Vệ sinh bếp': 85, 'Nguồn gốc': 90, 'Quy trình': 88, 'Bảo quản': 85, 'Nhân viên': 90 }, 
        history: [{date: '02/11/2025', score: 88, who: 'ComSV Team'}] 
    },
    'Quán Ngon Hà Đông': { 
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
    },
    'Canteen Xuân Phương': { 
        score: 96, grade: 'A', color: '#27ae60', 
        certs: ['VSATTP', 'HACCP'], 
        criteria: { 'Vệ sinh bếp': 95, 'Nguồn gốc': 98, 'Quy trình': 96, 'Bảo quản': 95, 'Nhân viên': 94 }, 
        history: [{date: '06/11/2025', score: 96, who: 'Ban QL KTX'}] 
    }
};

// Link Google Form để đánh giá (Bạn thay link của bạn vào đây)
const GOOGLE_FORM_LINK = "https://docs.google.com/forms/u/0/"; 

// ===================================================
// 2. CÁC HÀM TIỆN ÍCH (HELPER FUNCTIONS)
// ===================================================

// Lấy tên hiển thị đầy đủ của khu vực
function getAreaName(key) {
    if(key === 'khu1') return 'Khu 1 (Bách-Kinh-Xây)';
    if(key === 'khu2') return 'Khu 2 (Cầu Giấy)';
    if(key === 'khu3') return 'Khu 3 (Hà Đông)';
    if(key === 'khu4') return 'Khu 4 (Chùa Láng)';
    if(key === 'khu5') return 'Khu 5 (Xuân Phương)';
    return key;
}

// Chuyển trang (Home <-> Menu <-> Order <-> Tracking)
function navigateTo(pageId) {
    // Ẩn tất cả các trang
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Hiện trang được chọn
    document.getElementById(pageId).classList.add('active');
    
    // Cập nhật trạng thái menu (active link)
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const link = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if(link) link.classList.add('active');
    
    window.scrollTo(0, 0);
    
    // Nếu vào trang Menu thì mặc định chọn Khu 1
    if (pageId === 'menu') switchTab('khu1');
}

// Chuyển Tab Khu vực (Khu 1 -> Khu 5)
function switchTab(areaId) {
    // Ẩn nội dung các khu
    document.querySelectorAll('.area-content').forEach(c => c.classList.remove('active'));
    // Hiện nội dung khu được chọn
    document.getElementById(areaId).classList.add('active');
    
    // Cập nhật trạng thái nút bấm (Tabs)
    document.querySelectorAll('.area-tab').forEach(t => t.classList.remove('active'));
    const tabs = document.querySelectorAll('.area-tab');
    
    // Map areaId với thứ tự tab (0-4)
    if (areaId === 'khu1' && tabs[0]) tabs[0].classList.add('active');
    if (areaId === 'khu2' && tabs[1]) tabs[1].classList.add('active');
    if (areaId === 'khu3' && tabs[2]) tabs[2].classList.add('active');
    if (areaId === 'khu4' && tabs[3]) tabs[3].classList.add('active');
    if (areaId === 'khu5' && tabs[4]) tabs[4].classList.add('active');
}

// Chuyển Tab con (Món chính / Ăn vặt / Đồ uống)
function switchSubTab(subId, btnElement) {
    const parentArea = btnElement.closest('.area-content');
    
    // Ẩn tất cả sub-content trong khu vực đó
    parentArea.querySelectorAll('.sub-content').forEach(el => el.classList.remove('active'));
    
    // Hiện sub-content được chọn
    document.getElementById(subId).classList.add('active');
    
    // Xử lý trạng thái nút bấm
    parentArea.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
}

// ===================================================
// 3. LOGIC GIỎ HÀNG (CART SYSTEM)
// ===================================================
let cart = [];

function addToCart(mealName, price, areaKey) {
    // Kiểm tra xem giỏ hàng có đang chứa món của khu vực khác không
    if (cart.length > 0 && cart[0].area !== areaKey) {
        let confirmSwitch = confirm(`Giỏ hàng đang có món của ${getAreaName(cart[0].area)}.\nBạn chỉ được đặt món cùng 1 khu vực.\n\nXóa giỏ hàng cũ để đặt món mới?`);
        if (confirmSwitch) {
            cart = []; 
        } else {
            return; 
        }
    }

    // Thêm món hoặc tăng số lượng
    const existingItem = cart.find(item => item.name === mealName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: mealName, price: price, area: areaKey, quantity: 1 });
    }
    
    updateCartCountUI();
    
    // Hiệu ứng nút bấm "Đã thêm"
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "✅ Đã thêm";
    btn.style.background = "#2ecc71";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "#27ae60";
    }, 1000);
}

function updateCartCountUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').innerText = `(${totalCount})`;
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCartCountUI();
        openCartPage(); // Render lại trang giỏ hàng
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCountUI();
    openCartPage(); 
}

// Hiển thị trang Giỏ hàng & Thanh toán
function openCartPage() {
    navigateTo('order');
    const container = document.getElementById('cartListContainer');
    const totalEl = document.getElementById('cartTotal');
    const areaSelect = document.getElementById('areaSelect');
    
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:2rem;">Giỏ hàng trống 😢 <br> <a href="#" onclick="navigateTo(\'menu\')" style="color:#27ae60; font-weight:bold;">Quay lại chọn món ngay</a></div>';
        totalEl.innerText = '0đ';
        areaSelect.value = "";
        loadUniversities(); 
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            container.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <strong>${item.name}</strong>
                        <small>${item.price.toLocaleString()}đ</small>
                    </div>
                    <div class="quantity-controls">
                        <button class="btn-qty" onclick="changeQuantity(${index}, -1)">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="btn-qty" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="cart-item-remove" onclick="removeFromCart(${index})">&times;</div>
                </div>`;
        });
        totalEl.innerText = total.toLocaleString() + 'đ';

        // Tự động chọn khu vực dựa trên món trong giỏ
        areaSelect.value = cart[0].area;
        loadUniversities(); 
    }
}

// Load danh sách trường học dựa trên khu vực đã chọn
function loadUniversities() {
    const areaKey = document.getElementById('areaSelect').value;
    const pickupSelect = document.getElementById('pickupSelect');
    
    pickupSelect.innerHTML = '<option value="">-- Chọn điểm nhận hàng --</option>';
    
    if (areaKey && universityData[areaKey]) {
        pickupSelect.disabled = false;
        universityData[areaKey].forEach(uni => {
            const opt = document.createElement('option');
            opt.value = uni.name;
            opt.innerText = uni.name;
            pickupSelect.appendChild(opt);
        });
    } else {
        pickupSelect.disabled = true;
        pickupSelect.innerHTML = '<option value="">-- Vui lòng chọn khu vực trước --</option>';
    }
}

// ===================================================
// 4. LOGIC THANH TOÁN & ĐẶT HÀNG (PAYMENT)
// ===================================================
 // Mặc định tiền mặt

function submitOrder() {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const area = document.getElementById('areaSelect').value;
    const pickup = document.getElementById('pickupSelect').value;

    // Validate dữ liệu
    if (cart.length === 0) { alert('Giỏ hàng trống!'); return; }
    if (!name || !phone) { alert('Vui lòng nhập tên và SĐT!'); return; }
    
    if (cart.length > 0 && area !== cart[0].area) {
        alert(`Lỗi: Món ăn trong giỏ thuộc ${getAreaName(cart[0].area)}. Vui lòng chọn khu vực nhận hàng đúng!`);
        document.getElementById('areaSelect').value = cart[0].area;
        loadUniversities();
        return;
    }

    if (!pickup) { alert('Vui lòng chọn trường đại học cụ thể!'); return; }

    // Mở Modal thanh toán
    const modal = document.getElementById('paymentModal');
    if(modal) {
        modal.style.display = 'block';
        selectPaymentMethod('cash'); // Reset về tiền mặt
    } else {
        alert('Lỗi: Không tìm thấy modal thanh toán. Vui lòng kiểm tra lại file HTML.');
    }
}
let selectedPaymentMethod = 'cash';

// Hàm chọn phương thức (Đã sửa lại theo logic của phiên bản cũ chạy ổn định)
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    document.getElementById('method-cash').classList.remove('active');
    document.getElementById('method-qr').classList.remove('active');
    document.getElementById(`method-${method}`).classList.add('active');
}

// Bước 2: Xử lý khi ấn nút "Tiếp theo" ở Modal 1
function processPaymentStep1() {
    // Ẩn modal chọn phương thức ngay lập tức
    document.getElementById('paymentModal').style.display = 'none';

    if (selectedPaymentMethod === 'cash') {
        // Tiền mặt -> Chuyển sang thành công luôn
        processSuccessOrder();
    } else {
        // Chuyển khoản -> Mở Modal QR
        openQRModal();
    }
}

// Bước 3: Mở Modal QR
function openQRModal() {
    const qrModal = document.getElementById('qrModal');
    const qrImg = document.getElementById('qrImage');
    const qrTotalDisplay = document.getElementById('qrTotalDisplay');

    // Hiện modal trước
    qrModal.style.display = 'block';

    // Tính tiền
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Hiển thị số tiền
    if (qrTotalDisplay) qrTotalDisplay.innerText = total.toLocaleString() + 'đ';

    // Tạo QR Code
    const bankId = 'ICB'; 
    const accountNo = '113366668888'; 
    const template = 'compact';
    const qrSource = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${total}&addInfo=Thanh toan ComSV&accountName=COMSV`;

    // Gán ảnh
    if (qrImg) qrImg.src = qrSource;
}

// Bước 4: Xử lý khi ấn "Đã Chuyển Khoản Xong"
// Bước 4: Xử lý khi ấn nút "Đã Chuyển Khoản Xong"
function processPaymentStep2() {
    // 1. Đóng cái Modal QR lại trước cho gọn
    document.getElementById('qrModal').style.display = 'none';

    // 2. Dùng setTimeout 1 xíu để Modal QR tắt hẳn rồi mới hiện thông báo
    setTimeout(() => {
        // === ĐÂY LÀ HỘP THOẠI BẠN CẦN ===
        // Trình duyệt sẽ dừng lại ở đây và hiện nút OK.
        // Người dùng BẮT BUỘC phải ấn OK thì code mới chạy tiếp dòng dưới.
        alert("✅ THANH TOÁN THÀNH CÔNG!\n\nHệ thống đã nhận được tiền chuyển khoản.\nNhấn OK để hoàn tất đơn hàng.");

        // 3. Sau khi người dùng ấn OK ở trên, mới gọi hàm hiển thị màn hình chúc mừng
        processSuccessOrder();
    }, 100);
}

function processSuccessOrder() {
    console.log("Đang xử lý đơn hàng thành công..."); // Kiểm tra F12 nếu lỗi

    try {
        // 1. Đảm bảo đóng tất cả các modal khác
        document.getElementById('paymentModal').style.display = 'none';
        document.getElementById('qrModal').style.display = 'none';
        
        // 2. Lấy Overlay và hiển thị cưỡng chế
        const overlay = document.getElementById('successOverlay');
        if (overlay) {
            overlay.style.display = 'flex'; // Bắt buộc hiện
            overlay.style.zIndex = '99999'; // Đè lên tất cả
        } else {
            console.error("Lỗi: Không tìm thấy successOverlay trong HTML");
            alert("Đặt hàng thành công! (Lỗi hiển thị hiệu ứng)");
            finalizeOrder(); // Vẫn chuyển trang dù lỗi hiển thị
            return;
        }
        const pickupSelect = document.getElementById('pickupSelect');
        const trackingId = document.getElementById('trackingOrderId');
        const trackingLoc = document.getElementById('trackingLocation');

        if (trackingId) trackingId.textContent = '#SV' + Math.floor(Math.random() * 10000);
        if (trackingLoc && pickupSelect) trackingLoc.textContent = pickupSelect.value;

        // 4. Đợi 2.5 giây rồi chuyển trang
        setTimeout(() => {
            finalizeOrder();
        }, 2500);

    } catch (e) {
        console.error("Lỗi trong processSuccessOrder:", e);
        alert("Có lỗi xảy ra, nhưng đơn của bạn đã được ghi nhận.");
        finalizeOrder();
    }
}
function finalizeOrder() {
    const overlay = document.getElementById('successOverlay');
    if(overlay) overlay.style.display = 'none';

    // Reset dữ liệu
    cart = []; 
    updateCartCountUI();
    
    // Reset form input
    const nameInput = document.getElementById('customerName');
    const phoneInput = document.getElementById('customerPhone');
    if(nameInput) nameInput.value = '';
    if(phoneInput) phoneInput.value = '';
    
    // Chuyển trang
    navigateTo('tracking');
    startTrackingSimulation();
}

// ===================================================
// 5. TRACKING, FEEDBACK & MODALS
// ===================================================

function startTrackingSimulation() {
    const steps = ['track-step-1', 'track-step-2', 'track-step-3', 'track-step-4'];
    let current = 0;
    
    // Reset trạng thái
    steps.forEach(id => { const el = document.getElementById(id); el.classList.remove('active', 'completed'); });
    document.getElementById(steps[0]).classList.add('active');
    
    // Ẩn các nút hành động (Đánh giá / Đặt mới) lúc bắt đầu
    const actions = document.getElementById('trackingActions');
    if(actions) actions.style.display = 'none';

    // Chạy giả lập timeline
    const interval = setInterval(() => {
        current++;
        if (current < steps.length) {
            document.getElementById(steps[current-1]).classList.remove('active');
            document.getElementById(steps[current-1]).classList.add('completed');
            document.getElementById(steps[current]).classList.add('active');
        } else {
            // Hoàn thành
            document.getElementById(steps[current-1]).classList.remove('active');
            document.getElementById(steps[current-1]).classList.add('completed');
            
            // Hiện nút đánh giá
            if(actions) actions.style.display = 'flex';
            
            clearInterval(interval);
        }
    }, 2000); // 2 giây mỗi bước
}

// Mở link Google Form & Reset app
function openFeedback() {
    window.open(GOOGLE_FORM_LINK, '_blank');
    resetApp();
}

// Reset app về trang chủ
function resetApp() {
    // Đảm bảo giỏ hàng sạch
    cart = [];
    updateCartCountUI();
    
    navigateTo('home');
}

// Mở Modal Chất Lượng (Quality)
function openQualityModal(name, type) {
    const data = qualityDB[name];
    if(!data) {
        console.error("Không tìm thấy dữ liệu quán: " + name);
        return;
    }
    
    document.getElementById('modalTitle').innerText = name;
    document.getElementById('modalScoreVal').innerText = data.score;
    document.getElementById('modalScoreCircle').style.background = data.color;
    document.getElementById('modalGrade').innerText = 'Hạng ' + data.grade;
    document.getElementById('modalGrade').style.color = data.color;
    
    const certsHTML = data.certs.map(c => `<span class="cert-tag"> 📜  ${c}</span>`).join('');
    document.getElementById('modalCerts').innerHTML = certsHTML;
    
    let criteriaHTML = '';
    for (const [key, val] of Object.entries(data.criteria)) {
        criteriaHTML += `<div class="criteria-item"><div class="criteria-top"><span>${key}</span><span>${val}/100</span></div><div class="progress-bg"><div class="progress-fill" style="width:${val}%; background:${data.color}"></div></div></div>`;
    }
    document.getElementById('modalCriteriaList').innerHTML = criteriaHTML;
    
    const histHTML = data.history.map(h => `<div class="history-item" style="border-left-color: ${data.color}"><div><strong>${h.date}</strong></div><div style="color:${data.color}; font-weight:bold;">${h.score} điểm</div><div style="color:#666;">${h.who}</div></div>`).join('');
    document.getElementById('modalHistory').innerHTML = histHTML;
    
    document.getElementById('qualityModal').style.display = 'block';
}

// Các hàm đóng Modal
function closePaymentModal() { document.getElementById('paymentModal').style.display = 'none'; }
function closeQRModal() { document.getElementById('qrModal').style.display = 'none'; }
function closeQualityModal() { document.getElementById('qualityModal').style.display = 'none'; }

// Đóng modal khi click ra vùng đen bên ngoài
window.onclick = function(event) {
    if (event.target == document.getElementById('qualityModal')) closeQualityModal();
    if (event.target == document.getElementById('paymentModal')) closePaymentModal();
    if (event.target == document.getElementById('qrModal')) closeQRModal();
}
