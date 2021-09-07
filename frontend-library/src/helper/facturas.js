import axios from '../services/AxiosConection'


export const orderGrafics = async () => {

    const { data } = await axios.get('facturacion')

    const facturados = data.map((f) => {
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

    const ordenado = ordenSduplicate.sort((a, b) => a.fecha - b.fecha)
    //console.log(ordenado)
    const meses = ordenado.map(r => r.fecha)
    const total = ordenado.map(r => r.total)

    return [meses, total]
}