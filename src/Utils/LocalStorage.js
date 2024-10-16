export default class LocalStorage {
    static post(key, value) {
        let datas = JSON.parse(localStorage.getItem(key)) || [];

        const existingCommande = datas.find(commande => commande.id === value.id);

        if (existingCommande) {
            existingCommande.quantite++;
        } else {
            const newCommande = { ...value, quantite: 1 };
            datas.push(newCommande);
        }

        // Update localStorage
        localStorage.setItem("commandes", JSON.stringify(datas));
    }

    static get(key){
        return JSON.parse(localStorage.getItem(key));
    }

    static delete(key,id){
        let datas = JSON.parse(localStorage.getItem(key));

        datas = datas.filter(commande => commande.id !== id);

        console.log(datas);

        localStorage.setItem("commandes", JSON.stringify(datas));
        return id;
    }
}