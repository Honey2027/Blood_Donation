let donors = JSON.parse(localStorage.getItem("donors")) || [];

function save() {
  localStorage.setItem("donors", JSON.stringify(donors));
}

function register() {
  const name = document.getElementById("name").value;
  const blood = document.getElementById("blood").value;
  const city = document.getElementById("city").value;

  if (!name || !blood || !city) {
    alert("Fill all fields");
    return;
  }

  donors.push({ name, blood, city });
  save();

  alert("Donor added");

  document.getElementById("name").value = "";
  document.getElementById("blood").value = "";
  document.getElementById("city").value = "";
  
  render();
}

function render() {
  const container = document.getElementById("result");
  const filter = document.getElementById("searchBlood").value;

  container.innerHTML = "";

  let filtered = donors;
  if (filter) {
    filtered = donors.filter(d => d.blood === filter);
  }

  if (filtered.length === 0) {
    container.innerHTML = "<p class='text-muted'>No donors available</p>";
    return;
  }

  filtered.forEach(d => {
    const col = document.createElement("div");
    col.className = "col-md-6";

    col.innerHTML = `
      <div class="donor-card">
        <h5>${d.name}</h5>
        <p class="text-muted mb-1">${d.city}</p>
        <span class="badge-blood">${d.blood}</span>
      </div>
    `;

    container.appendChild(col);
  });
}

document.getElementById("searchBlood").addEventListener("change", render);

// initial load
render();