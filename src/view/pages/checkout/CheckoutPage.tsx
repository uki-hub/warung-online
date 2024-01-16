import { Space, Text, Title } from "@mantine/core";

const CheckoutPage = () => {
  return (
    <div className="flex flex-col justify-center items-center py-10 px-6">
      <div className="w-full max-w-[1000px] px-6 py-5 rounded bg-white">
        <div className="flex justify-between">
          <Title className="text-gray-600">Invoice</Title>
          <Text className="font-semibold text-gray-700">No. 10984209893094</Text>
        </div>
        <Space h={40} />
        <div className="text-gray-700">
          <div className="flex">
            <div className="flex-[15%]">Nama</div>
            <div className="flex-[2%]">:</div>
            <div className="flex-[83%] font-bold">Marzuki</div>
          </div>
          <div className="flex">
            <div className="flex-[15%]">Tanggal</div>
            <div className="flex-[2%]">:</div>
            <div className="flex-[83%] font-bold">12 Januari 2024</div>
          </div>
          <div className="flex">
            <div className="flex-[15%]">Status</div>
            <div className="flex-[2%]">:</div>
            <div className="flex-[83%] font-bold text-green-600">LUNAS</div>
          </div>
        </div>
        <Space h={30} />
        <table className="w-full border">
          <thead className=" bg-gray-200 text-gray-600 ">
            <tr>
              <th className="w-[35%] font-semibold text-start pl-4 py-3">Barang</th>
              <th className="w-[15%] font-semibold text-start">Jumlah</th>
              <th className="w-[20%] font-semibold text-start">Harga</th>
              <th className="w-[20%] font-semibold text-start">Jumlah Harga</th>
            </tr>
          </thead>
          <tbody className="text-gray-500">
            <tr>
              <th className="w-[35%] font-normal text-start pl-4 py-3">Laptop Asus</th>
              <th className="w-[15%] font-normal text-start">2</th>
              <th className="w-[20%] font-normal text-start">$3000</th>
              <th className="w-[20%] font-normal text-start">$6000</th>
            </tr>
            <tr>
              <th className="w-[35%] font-normal text-start pl-4 py-3">Laptop Asus</th>
              <th className="w-[15%] font-normal text-start">2</th>
              <th className="w-[20%] font-normal text-start">$3000</th>
              <th className="w-[20%] font-normal text-start">$6000</th>
            </tr>
            <tr>
              <th className="w-[35%] font-normal text-start pl-4 py-3">Laptop Asus</th>
              <th className="w-[15%] font-normal text-start">2</th>
              <th className="w-[20%] font-normal text-start">$3000</th>
              <th className="w-[20%] font-normal text-start">$6000</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckoutPage;
