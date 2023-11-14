import logo from './logo.svg';
import './App.css';





function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}


function SearchBar({database}) {
  return (
    <form>
    <input type="text" placeholder="Search..." />
    <label>
      <input type="checkbox" />
      {' '}
      Only show products in stock
    </label>
  </form>
  );
}


function ProductTable( {products} ) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(
      <ProductRow
      product={product}
      key={product.name}
      />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}


function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}


function ProductRow( {product} ) {
  const name = product.stocked ? product.name :
    <span style={{color: 'red'}}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}


export default function App() {
  // import data from json
  const fruit_vendor = require('./fruit_vendor.json');

  return (
  <FilterableProductTable products={fruit_vendor} />
  );
}
