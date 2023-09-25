import fs from "fs";

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "products.json";
        this.createFile();
    }

    createFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        }
    }

    async getProducts() {
        this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));

        return this.products;
    }

    async addProduct(productData) {
        this.products = await this.getProducts();
        const id = this.generateId();
        const newProduct = { id, ...productData };
        this.products.push(newProduct);

        await this.saveProducts();
        console.log("Product added!");

        return true;
    }

    async updateProduct(productId, updatedProductData) {
        this.products = await this.getProducts();
        const productIndex = this.products.findIndex(item => item.id === productId);

        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedProductData };
            await this.saveProducts();
            console.log("Product updated!");
            return true;
        }

        return false;
    }

    async deleteProduct(productId){
        const allproducts=await this.getProducts({})
        const productswithoutfound=allproducts.filter(elemento=>elemento.id!==parseInt(productId))
        await fs.promises.writeFile(this.path,JSON.stringify(productswithoutfound,null,2))
      }


    generateId() {
        let max = 0;
        this.products.forEach(item => {
            if (item.id > max) {
                max = item.id;
            }
        });

        return max + 1;
    }

    async saveProducts() {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    }
}

export default ProductManager;