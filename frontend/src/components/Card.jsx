function Card() {
  return (
    <div className="border-2 p-2 rounded-2xl">
      <img
        src="https://tse2.mm.bing.net/th/id/OIP.HyPO0GQqnsGoMcauAHz_MQHaE7?r=0&cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3"
        alt="House"
        className="w-full h-40 object-cover rounded-lg"
      />

      <h2 className="mt-2 font-bold">
        Title
      </h2>

      <p>
        Description
      </p>

      <a href="#">
        More Details
      </a>
    </div>
  );
}

export default Card;