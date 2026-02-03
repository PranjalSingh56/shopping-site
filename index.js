let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 6;

// Fetch products
const fetchProducts = () => {
  fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
      allProducts = data.products;
      filteredProducts = allProducts;
      renderProducts();
    })
    .catch(err => console.log(err));
};

const updatePaginationButtons = () => {
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || totalPages === 0;
};

// Render with pagination
const renderProducts = () => {
  const container = document.getElementById("list");
  container.innerHTML = "";

  document.getElementById("page").innerText = `Page ${currentPage}`;

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedItems = filteredProducts.slice(start, end);

  if (paginatedItems.length === 0) {
    container.innerHTML = "<p>No products found</p>";
    updatePaginationButtons();
    return;
  }

  paginatedItems.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${product.thumbnail}">
      <p>₹${product.price}</p>
    `;

    container.appendChild(card);
  });
  updatePaginationButtons()
};

// Search button
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  let query = document.getElementById("searchInput").value.trim();

  if (!query) {
    alert("Please enter a search term");
    return;
  }

  currentPage = 1;
  filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  renderProducts();
});

// Pagination buttons
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");

nextBtn.addEventListener("click", () => {
  const totalPage = Math.ceil(filteredProducts.length / itemsPerPage);
  if (currentPage < totalPage) {
    currentPage++;
    renderProducts();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderProducts();
  }
});

// Load data
fetchProducts();
