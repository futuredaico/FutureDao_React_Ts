// 将数字转化为 1,234,567等形式
export function toThousands(num: string) {
    let result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}

export function toFixed(number:number,fractionDigits:number)
{
    if(!isNaN(number))
    {
        const reg = new RegExp(`([0-9]+.[0-9]{${fractionDigits}})[0-9]*`);
        return parseFloat(number.toString().replace(reg,"$1"));
    }
    else
    {
        throw new Error("参数错误");
        
    }
}

/**
 * 快速将字符串转成对应的数组字符串
 * @param str 要转换的字符串
 * @param decimal 小数位数
 */
export function asNumber(str:string,decimal?:number)
{
    let value = str;
    // 先把非数字的都替换掉，除了数字和.

    value = value.replace(/[^\d.]/g,"");

    // 保证只有出现一个.而没有多个.

    value = value.replace(/\.{2,}/g,".");

    // 必须保证第一个为数字而不是.

    value = value.replace(/^\./g,"");

    // 保证.只出现一次，而不能出现两次以上

    value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");

    if(decimal)
    {
        const decstr = (new Array(decimal)).fill('\\d').join('');   // 快速创建对应含有多少个的\d 用于匹配位数
        // 只能输入两个小数
        const reg = new RegExp(`^(\-)*(\\d+)\.(${decstr}).*$`);
        value = value.replace(reg,'$1$2.$3');
    }
    
    return value;
}
class MyNumber
{
    public value:number;
    
    constructor(value:string|number)
    {
        if(typeof value==="string")
        {
            this.value = parseFloat(value);
        }
        else
        {
            this.value = value;
        }
    }

    public toString(){
        return this.value.toString();
    }
    /**
     * 加
     * @param arg 
     */
    public add(...arg) {
        // tslint:disable-next-line:one-variable-per-declaration
        let r1, r2, m, result = this.value;
        arg.forEach(value => {
            if(typeof value==="object")
            {
                value=value['value'];
            }
            try { r1 = result.toString().split(".")[1].length } catch (e) { r1 = 0 }
            try { r2 = value.toString().split(".")[1].length } catch (e) { r2 = 0 }
            m = Math.pow(10, Math.max(r1, r2));
            result = Math.round(result * m + value * m) / m;
        });
        return new MyNumber(result);
    }
    /**
     * 减
     * @param arg 
     */
    public sub (...arg) {
        // tslint:disable-next-line:one-variable-per-declaration
        let r1, r2, m, result = this.value;
        arg.forEach(value => {
            if(typeof value==="object")
            {
                value=value['value'];
            }
            try { r1 = result.toString().split(".")[1].length } catch (e) { r1 = 0 }
            try { r2 = value.toString().split(".")[1].length } catch (e) { r2 = 0 }
            m = Math.pow(10, Math.max(r1, r2));
            const n = (r1 >= r2) ? r1 : r2;
            result = parseFloat((Math.round(result * m - value * m) / m).toFixed(n));
        });
        return new MyNumber(result);
    };
    /**
     * 乘
     * @param arg 
     */
    public mul(...arg) {
        let result = this.value;
        arg.forEach(value => {
            if(typeof value==="object")
            {
                value=value['value'];
            }
            let m = 0;
            const s1 = result.toString();
            const s2 = value.toString();
            try { m += s1.split(".")[1].length } catch (e) { m=0 }
            try { m += s2.split(".")[1].length } catch (e) { m=m }
            result = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        });
        return new MyNumber(result);
    };
    /**
     * 除
     * @param arg 
     */
    public div(...arg) {
        let result = this.value;
        arg.forEach(value => {
            let t1 = 0; let t2 = 0;let r1; let r2;
            try { t1 = result.toString().split(".")[1].length } catch (e) { t1=0 }
            try { t2 = value.toString().split(".")[1].length } catch (e) { t2=0 }
            r1 = Number(result.toString().replace(".", ""));
            r2 = Number(value.toString().replace(".", ""));
            result = (r1 / r2) * Math.pow(10, t2 - t1);
        });
        return new MyNumber(result);
    };

    /**
     * 平方
     */
    public sqr(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        return this.mul(this.value);
    }

    /**
     * 开平方根
     */
    public sqrt(){
        return new MyNumber(Math.sqrt(this.value));
    }

}

export const toMyNumber=(value:string|number)=>{
    return new MyNumber(value);
}