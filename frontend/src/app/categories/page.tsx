export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: "Fruits & Vegetables",
      image: "https://media.istockphoto.com/id/1409236261/photo/healthy-food-healthy-eating-background-fruit-vegetable-berry-vegetarian-eating-superfood.jpg?s=612x612&w=0&k=20&c=kYZKgwsQbH_Hscl3mPRKkus0h1OPuL0TcXxZcO2Zdj0=",
      itemCount: 150
    },
    {
      id: 2,
      name: "Dairy & Eggs",
      image: "https://www.shutterstock.com/image-photo/fresh-dairy-products-milk-cottage-600nw-1679020255.jpg",
      itemCount: 80
    },
    {
      id: 3,
      name: "Bakery",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/1/379708876/VJ/KL/CS/32041095/sliced-brown-bread.jpg",
      itemCount: 60
    },
    {
      id: 4,
      name: "Meat & Seafood",
      image: "https://japanbite.com/cdn/shop/articles/featured_image_3ac868b2-7ad1-4fc2-adb9-38bf5a447241-369559.jpg?v=1715329600",
      itemCount: 100
    },
    {
      id: 5,
      name: "Pantry",
      image: "https://via.placeholder.com/300",
      itemCount: 200
    },
    {
      id: 6,
      name: "Beverages",
      image: "https://via.placeholder.com/300",
      itemCount: 120
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Shop by Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-black">{category.name}</h2>
              <p className="text-gray-600 text-black">{category.itemCount} items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 