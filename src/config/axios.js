/*
 * Maintained by jemo from 2020.2.6 to now
 * Created by jemo on 2020.2.6 10:09:07
 * axios
 */

import axios from 'axios'
import { url } from './index'

const instance = axios.create({
  baseURL: url,
})

export default instance
