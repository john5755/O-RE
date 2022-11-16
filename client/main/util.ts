export const isProd: boolean = process.env.NODE_ENV === 'production';

export default {
    getAsset: (asset: string) => isProd ? `${__dirname}/images/${asset}` : `renderer/public/images/${asset}`
}