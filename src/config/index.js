/*
 * Maintained by jemo from 2020.2.6 to now
 * Created by jemo on 2020.2.6 10:03:15
 * Config
 */

const productionUrl = ''
const testUrl = 'http://192.168.0.111:7000'

export const isProductionENV = process.env.NODE_ENV === 'production'
export const url = isProductionENV ? productionUrl : testUrl
