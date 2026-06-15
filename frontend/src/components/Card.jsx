function Card() {
    return (
        <section className="border-2 p-2 rounded-2xl">
            <div>
                <img src="https://tse2.mm.bing.net/th/id/OIP.HyPO0GQqnsGoMcauAHz_MQHaE7?r=0&cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3" alt="House" />
            </div>

            <div>
                <h2>
                    Title
                </h2>
            </div>

            <div>
                <p>
                    Description
                </p>
            </div>

            <div>
                <a href="">More Details</a>
            </div>
        </section>
    );
}

export default Card;