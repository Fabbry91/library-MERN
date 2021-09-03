
export const orderGrafics = async (order) => {

    const facturados = order.map((f) => {
        const obj = {
            fecha: parseInt(f.fecha.slice(5, 7)),
            total: f.total
        }
        return obj;
    })


    const ordenSduplicate = facturados.reduce((acc, valorAcr) => {

        const existe = acc.find(e => e.fecha === valorAcr.fecha);

        if (existe) {

            return acc.map((e) => {
                if (e.fecha === valorAcr.fecha) {
                    return {
                        fecha: e.fecha,
                        total: e.total + valorAcr.total
                    }
                }

                return e;
            });
        }

        return [...acc, valorAcr]
    }, []);

    const ordenado = ordenSduplicate.sort(o => o.fecha)
    //console.log(ordenSduplicate)
    return ordenado
}