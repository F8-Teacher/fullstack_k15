import { getAccessToken } from "@/app/actions/auth.action";
import { CONFIG } from "@/app/constants/config.constant";

const getCartList = async () => {
  const accessToken = await getAccessToken();
  const response = await fetch(`${CONFIG.BASE_API}/shopping-cart`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
};
export default async function CartPage() {
  const { items, total } = await getCartList();
  console.log(items);

  return (
    <div>
      <h1 className="text-3xl mb-3">Cart</h1>

      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Price
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.productId}
                className="bg-neutral-primary border-b border-default"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.price.toLocaleString()}</td>
                <td className="px-6 py-4">${item.quantity}</td>
                <td className="px-6 py-4">${item.total.toLocaleString()}</td>
                <td className="px-6 py-4">&times;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
