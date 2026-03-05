
const STORAGE_KEY = "vanzato_imc_v0.4.0";
let entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

document.getElementById("search-input").addEventListener("input", (e) => renderList(e.target.value));
window.getEntries = () => JSON.stringify(entries);

window.saveToStorage = (name, age, weight, height, imc, category) => {
    const entry = { id: Date.now(), name, age, weight, height, imc, category };
    entries.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    renderList();
};

window.selectPatient = (id) => {
    const p = entries.find(e => e.id === id);
    if (!p) return;
    document.getElementById("p-name").value = p.name;
    document.getElementById("p-age").value = p.age;
    document.getElementById("p-weight").value = p.weight;
    document.getElementById("p-height").value = p.height;
    document.querySelector(".imc-value").innerText = p.imc;
    document.querySelector(".imc-category").innerText = p.category;
};

function renderList(filter = "") {
    const list = document.getElementById("patient-list");
    const filtered = entries.filter(e => e.name.toLowerCase().includes(filter.toLowerCase().trim()));
    list.innerHTML = filtered.map(e => `
        <li class="patient-item" onclick="selectPatient(${e.id})">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <strong style="display:block; color:white;">${e.name}</strong>
                    <small style="color:#737373;">${e.age} anos | IMC: ${e.imc}</small>
                </div>
                <i data-lucide="chevron-right" style="color:#FF0000; width:16px;"></i>
            </div>
        </li>
    `).join("");
    lucide.createIcons();
}

document.getElementById("btn-new").onclick = () => {
    document.querySelectorAll("input").forEach(i => i.value = "");
    document.querySelector(".imc-value").innerText = "--";
    document.querySelector(".imc-category").innerText = "Aguardando dados";
};

document.getElementById("btn-collapse").onclick = () => document.querySelector(".sidebar").classList.add("collapsed");
document.getElementById("btn-open").onclick = () => document.querySelector(".sidebar").classList.remove("collapsed");

window.onload = () => { renderList(); lucide.createIcons(); };
