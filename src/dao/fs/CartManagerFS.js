import fs from "fs";

class CartManager {
    constructor() {
        this.carts = [];
        this.path = "Carts.json";
        this.createFile();
    }

    createFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.carts));
        }
    }

    async newCart() {
        this.carts.push({ id: this.generateId(), products: [] });
        await this.saveCarts();
        console.log("Cart created!");

        return true;
    }

    async getCart(id) {
        this.carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));

        return this.carts.find(item => item.id === id);
    }

    async getCarts() {
        const carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));

        return carts;
    }

    generateId() {
        let max = 0;
        this.carts.forEach(item => {
            if (item.id > max) {
                max = item.id;
            }
        });

        return max + 1;
    }

    async saveCarts() {
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
    }

    async addProductToCart(cid, pid) {
        this.carts = await this.getCarts();
        const cart = this.carts.find(item => item.id === cid);
        let product = cart.products.find(item => item.product === pid);

        if (product) {
            product.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await this.saveCarts();
        console.log("Product added!");

        return true;
    }

    async deleteCart(cid) {
        this.carts = await this.getCarts();
        const cartIndex = this.carts.findIndex(item => item.id === cid);

        if (cartIndex !== -1) {
            this.carts.splice(cartIndex, 1);
            await this.saveCarts();
            console.log("Cart deleted!");
            return true;
        }

        return false;
    }
}

export default CartManager;