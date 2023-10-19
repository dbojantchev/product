import Link from 'next/link';
import './styles.css'
import { promises as fs } from 'fs';

export default async function Page(request:any) {
    let filteredProducts = [];

    /* This function finds all colors in the available product set */
    const deduceColors = (products:any) => {
    const colorSet = new Set();
    for(let i = 0; i < products.length; i++) {
        colorSet.add(products[i].color);
    }
    return Array.from(colorSet);
  }

  /* Check for color filter */
  const color = request.searchParams?.color;

  /* Load the product JSON -- this would be better served by an API call in a real situation */
  const productsStr = await fs.readFile(process.cwd() + '/data/product-fixtures.json', 'utf8');
  const products = JSON.parse(productsStr);
  const colors: string[] = deduceColors(products) as string[];

  /* Apply color filter */
  if(color) {
      filteredProducts = products.filter((p:any) => p.color === color);
  } else {
      filteredProducts = [...products];
  }

  return (
    <main className="main-content">
        <h2 className={"product-list-title"}>Product List Page</h2>

      <div className={"filter-row"}>
          <div className={"filter-row-title"}>Select Color:</div>
          <div className={"filter-row-options"}>
              <a className={`color-option ${!color ? 'color-option-selected' : ''}`} href={`/product-list`} key={'all'}>&#10006;</a>
              {colors.map(c => {
                  return <a style={{color: c}} className={`color-option ${color===c ? 'color-option-selected' : ''}`} href={`/product-list?color=${c}`} key={c}>{c}</a>
              })}
          </div>
      </div>

        <table className={"product-table"}>
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Color</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {filteredProducts.map((p:any) => {
                    return (
                        <tr key={p.sku}>

                            <td>{p.sku}</td>
                            <td>{p.name}</td>
                            <td>{p.type}</td>
                            <td>{p.color}</td>
                            <td className={"price-col"}>${p.price}</td>
                            <td className={"edit-col"}>
                                <Link href={{ pathname: 'product-detail', query: { ...p } }}> &#9998;</Link>{' '}
                            </td>
                        </tr>
                    )
                    }
                )}
            </tbody>
        </table>

    </main>
  )
}
