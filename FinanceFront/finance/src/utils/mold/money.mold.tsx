export const maskMoney = (valor: any) => valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });


export interface IDecimalProps {
    precisao: number;
    permiteSinal?: boolean;
    prefixo?: string;
    sufixo?: string;
    required?: boolean;
    min?: number;
    max?: number;
    separadorMilhares?: string;
}

export const maskDecimal = (value: string, props: IDecimalProps): string => {
    value = (value || '').trim();
    props = initDecimalProps(props);

    let onlyNumbers = value.match(/\d+/g) || [];
    let numbers = onlyNumbers.join('');
    let sinal = props.permiteSinal ? value[0] === '-' || value[0] === '+' ? value[0] : '' : '';

    if (!numbers) {
        return sinal;
    }

    const decimalSeparator = ',';
    const precision = props.precisao || 2; // Define a precisão desejada

    if (parseInt(numbers) === 0) {
        const zeros = '0'.repeat(precision);
        return `${sinal}${props.prefixo} 0${decimalSeparator}${zeros}${props.sufixo}`.trim();
    }

    let quantZeros = props.precisao;
    for (let index = props.precisao + 1; index > 0; index--) {
        const sp = value.substr(value.length - index, 1);
        if (sp === '.' || sp === ',') {
            quantZeros = props.precisao + 1 - index;
            break;
        }
    }
    const zeros = new Array(quantZeros + 1).join('0');
    numbers = `${numbers}${zeros}`;

    quantZeros = props.precisao - 1;
    for (let index = 1; index <= props.precisao; index++) {
        const integerNumber = parseInt(numbers);
        if (integerNumber < Math.pow(10, index)) {
            let zeros = new Array(quantZeros + 1).join('0');
            return `${sinal}${props.prefixo} 0,${zeros}${parseInt(numbers)} ${props.sufixo}`.trim();
        }
        quantZeros--;
    }

    let quantAnt = numbers.length - props.precisao;
    const quantMil = Math.trunc(quantAnt / 3);
    const resto = quantAnt - (quantMil * 3);
    const unidadesMil: string[] = resto ? [numbers.substr(0, resto)] : [];

    for (let index = resto; index < quantAnt; index += 3) {
        unidadesMil.push(numbers.substr(index, 3));
    }
    let number = `${unidadesMil.join('.')},${numbers.substr(numbers.length - props.precisao, props.precisao)}`;
    number = `${sinal}${props.prefixo} ${number} ${props.sufixo}`.trim();

    return number;
};

export const maskDecimal33 = (value: string, props: IDecimalProps): string => {
    value = (value || '').trim();
    props = initDecimalProps(props);

    let onlyNumbers = value.match(/\d+/g) || [];
    let numbers = onlyNumbers.join('');
    let sinal = props.permiteSinal ? (value[0] === '-' || value[0] === '+' ? value[0] : '') : '';

    if (!numbers) {
        return sinal;
    }

    const decimalSeparator = ',';
    const precision = props.precisao || 2; // Define a precisão 

    if (parseInt(numbers) === 0) {
        const zeros = '0'.repeat(precision);
        return `${sinal}${props.prefixo} 0${decimalSeparator}${zeros}${props.sufixo}`.trim();
    }
    // debugger
    console.log('precision', precision)
    let formattedValue = numbers.padStart(precision); // Adiciona zeros à esquerda
    console.log('formattedValue', formattedValue)

    const decimalPart = formattedValue.slice(-precision); // Obtém a parte decimal
    const integerPart = formattedValue.slice(0, -precision) || '0'; // Obtém a parte inteira

    formattedValue = `${integerPart}${decimalSeparator}${decimalPart}`;

    formattedValue = `${sinal}${props.prefixo} ${formattedValue} ${props.sufixo}`.trim();

    return formattedValue;
};

export const maskDecimal44 = (value: string, props: IDecimalProps): string => {
    value = (value || '').trim();
    props = initDecimalProps(props);

    let onlyNumbers = value.match(/\d+/g) || [];
    let numbers = onlyNumbers.join('');
    let sinal = props.permiteSinal ? (value[0] === '-' || value[0] === '+' ? value[0] : '') : '';

    if (!numbers) {
        return sinal;
    }

    const decimalSeparator = ',';
    const precision = props.precisao || 2;

    // Remover qualquer zero à esquerda antes de formatar
    numbers = numbers.replace(/^0+/, '');

    if (numbers.length === 0) {
        // Se não houver números além de zeros, retorna zero formatado
        const zeros = '0'.repeat(precision);
        return `${sinal}${props.prefixo} 0${decimalSeparator}${zeros}${props.sufixo}`.trim();
    }

    // Se a quantidade de dígitos for menor que a precisão, ajustar para o formato correto
    if (numbers.length < precision) {
        numbers = numbers.padStart(precision, '0');
    }

    let integerPart = numbers.slice(0, -precision) || '0';
    const decimalPart = numbers.slice(-precision);
    debugger;

    // Adicionar separador de milhares, se necessário
    if (props.separadorMilhares) {
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const formattedValue = `${sinal}${props.prefixo} ${integerPart}${decimalSeparator}${decimalPart} ${props.sufixo}`.trim();

    return formattedValue;
};

export const maskDecimal45 = (value: string, props: IDecimalProps): string => {
    value = (value || '').trim();
    props = initDecimalProps(props);

    let onlyNumbers = value.match(/\d+/g) || [];
    let numbers = onlyNumbers.join('');
    let sinal = props.permiteSinal ? (value[0] === '-' || value[0] === '+' ? value[0] : '') : '';

    if (!numbers) {
        return sinal;
    }

    const decimalSeparator = ',';
    const precision = props.precisao || 2;

    // Remover qualquer zero à esquerda antes de formatar
    numbers = numbers.replace(/^0+/, '');

    if (numbers.length === 0) {
        // Se não houver números além de zeros, retorna zero formatado
        const zeros = '0'.repeat(precision);
        return `${sinal}${props.prefixo} 0${decimalSeparator}${zeros}${props.sufixo}`.trim();
    }

    // Verificar se o número original tinha menos dígitos do que a precisão definida
    const originalDigits = onlyNumbers.join('').length;
    if (originalDigits < precision) {
        numbers = onlyNumbers.join('').padStart(precision, '0');
    }

    let integerPart = numbers.slice(0, -precision) || '0';
    const decimalPart = numbers.slice(-precision);

    // Adicionar separador de milhares, se necessário
    if (props.separadorMilhares) {
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const formattedValue = `${sinal}${props.prefixo} ${integerPart}${decimalSeparator}${decimalPart} ${props.sufixo}`.trim();

    return formattedValue;
};

// export const maskDecimal46 = (value: string, props: IDecimalProps): string => {
//     value = (value || '').trim();
//     props = initDecimalProps(props);
  
//     let onlyNumbers = value.match(/\d+/g) || [];
//     let numbers = onlyNumbers.join('');
//     let sinal = props.permiteSinal ? (value[0] === '-' || value[0] === '+' ? value[0] : '') : '';
  
//     if (!numbers && value !== '0') {
//       return sinal;
//     }
  
//     const decimalSeparator = ',';
//     const precision = props.precisao || 2; // Define a precisão desejada
//     numbers = numbers.replace(/^0+/, '');

  
//     if (numbers.length === 0) {
//       const zeros = '0'.repeat(precision);
//       return `${sinal}${props.prefixo} 0${decimalSeparator}${zeros}${props.sufixo}`.trim();
//     }
  
//     let formattedValue = '';
//     if (numbers.length <= precision) {
//       formattedValue = numbers.padStart(precision, '0');
//     } else {
//       const decimalPart = numbers.slice(-precision); // Obtém a parte decimal
//       const integerPart = numbers.slice(0, -precision) || '0'; // Obtém a parte inteira
//       formattedValue = `${integerPart}${decimalSeparator}${decimalPart}`;
//     }

//     formattedValue = `${sinal}${props.prefixo} ${formattedValue} ${props.sufixo}`.trim();
  
//     return formattedValue;
//   };
  
//   export const maskDecimal46 = (value: string, props: IDecimalProps): string => {
//     value = (value || '').trim();
//     props = initDecimalProps(props);
  
//     let onlyNumbers = value.match(/\d+/g) || [];
//     let numbers = onlyNumbers.join('');
//     let sinal = props.permiteSinal ? (value[0] === '-' || value[0] === '+' ? value[0] : '') : '';
  
//     if (!numbers && value !== '0') {
//       return sinal;
//     }
  
//     const decimalSeparator = ',';
//     const precision = props.precisao || 2;
//     numbers = numbers.replace(/^0+/, '');
  
//     if (numbers.length === 0) {
//       const zeros = '0'.repeat(precision);
//       return `${sinal}${props.prefixo} 0${decimalSeparator}${zeros}${props.sufixo}`.trim();
//     }
  
//     let formattedValue = '';
//     if (numbers.length <= precision) {
//       formattedValue = numbers.padStart(precision, '0');
//       formattedValue = `0${decimalSeparator}${formattedValue}`;
//     } else {
//       const decimalPart = numbers.slice(-precision);
//       const integerPart = numbers.slice(0, -precision) || '0';
//       formattedValue = `${integerPart}${decimalSeparator}${decimalPart}`;
//     }
  
//     formattedValue = `${sinal}${props.prefixo} ${formattedValue} ${props.sufixo}`.trim();
  
//     return formattedValue;
//   };
  
// export const maskDecimal46 = (value: string, props: IDecimalProps): string => {
//     value = (value || '').trim();
//     props = initDecimalProps(props);
  
//     let onlyNumbers = value.match(/\d+/g) || [];
//     let numbers = onlyNumbers.join('');
//     let sinal = props.permiteSinal ? (value[0] === '-' || value[0] === '+' ? value[0] : '') : '';
  
//     if (!numbers && value !== '0') {
//       return sinal;
//     }
  
//     const decimalSeparator = ',';
//     const precision = props.precisao || 2;
//     numbers = numbers.replace(/^0+/, '');
  
//     let integerPart = '';
//     let decimalPart = '';
  
//     if (numbers.length === 0) {
//       const zeros = '0'.repeat(precision);
//       return `${sinal}${props.prefixo} 0${decimalSeparator}${zeros}${props.sufixo}`.trim();
//     } else if (numbers.length <= precision) {
//       decimalPart = numbers.padStart(precision, '0');
//       decimalPart = decimalPart.slice(0, precision);
//       integerPart = '0';
//     } else {
//       decimalPart = numbers.slice(-precision);
//       integerPart = numbers.slice(0, -precision) || '0';
//     }
  
//     const formattedValue = `${sinal}${props.prefixo} ${integerPart}${decimalSeparator}${decimalPart} ${props.sufixo}`.trim();
  
//     return formattedValue;
//   };
  
// export const maskDecimal46 = (value: string, props: IDecimalProps): string => {
//     value = (value || '').trim();
//     props = initDecimalProps(props);
  
//     let onlyNumbers = value.match(/\d+/g) || [];
//     let numbers = onlyNumbers.join('');
//     let sinal = props.permiteSinal ? (value[0] === '-' || value[0] === '+' ? value[0] : '') : '';
  
//     if (!numbers && value !== '0') {
//       return sinal;
//     }
  
//     const decimalSeparator = ',';
//     const precision = props.precisao || 2;
//     numbers = numbers.replace(/^0+/, '');
  
//     if (numbers.length === 0) {
//       const zeros = '0'.repeat(precision);
//       return `${sinal}${props.prefixo} 0${decimalSeparator}${zeros}${props.sufixo}`.trim();
//     }
  
//     let formattedValue = '';
// if (numbers.length <= precision) {
//   formattedValue = numbers.padStart(precision, '0');
//   formattedValue = `${formattedValue.slice(0, -precision) || '0'}${decimalSeparator}${formattedValue.slice(-precision)}`;
// } else {
//   const decimalPart = numbers.slice(-precision);
//   const integerPart = numbers.slice(0, -precision) || '0';
//   formattedValue = `${integerPart}${decimalSeparator}${decimalPart}`;
// }

// formattedValue = `${sinal}${props.prefixo} ${formattedValue} ${props.sufixo}`.trim();

// return formattedValue;
//   };
  
// export const maskDecimal46 = (value: string, props: IDecimalProps): string => {
//     value = (value || '').trim();
    
//     var separar = value.split(".");
//     if (separar.length > 1) {
//         if (separar[1].length === 1) {
//             separar[1] += "0"; // Adiciona um zero ao final se houver apenas um dígito
//         } else if (separar[1].length === 0) {
//             separar[1] = "00"; // Adiciona dois zeros se não houver nenhum dígito após o ponto decimal
//         }
//     } else {
//         separar.push("00"); // Se não houver parte decimal, adiciona "00"
//     }

//     value.split('')
//     props = initDecimalProps(props);
  
//     let onlyNumbers = value.match(/\d+/g) || [];
//     let numbers = onlyNumbers.join('');
//     let sinal = props.permiteSinal ? (value[0] === '-' || value[0] === '+' ? value[0] : '') : '';
  
//     if (!numbers && value !== '0') {
//       return sinal;
//     }
  
//     const decimalSeparator = ',';
//     const precision = props.precisao || 2;
//     numbers = numbers.replace(/^0+/, '');
  
//     if (numbers.length === 0) {
//       const zeros = '0'.repeat(precision);
//       return `${sinal}${props.prefixo} 0${decimalSeparator}${zeros}${props.sufixo}`.trim();
//     }
  
//     let formattedValue = '';
  
//     if (numbers.length <= precision) {
//       formattedValue = numbers.padStart(precision, '0');
//       formattedValue = `${formattedValue.slice(0, -precision) || '0'}${decimalSeparator}${formattedValue.slice(-precision)}`;
//     } else {
//       const decimalPart = numbers.slice(-precision);
//       const integerPart = numbers.slice(0, -precision) || '0';
//       formattedValue = `${integerPart}${decimalSeparator}${decimalPart}`;
//     }
  
//     formattedValue = `${sinal}${props.prefixo} ${formattedValue} ${props.sufixo}`.trim();
  
//     return formattedValue;
// };

export const maskDecimal1 = (value: any, props: IDecimalProps | undefined = undefined): string => {
    return typeof (value) === 'number' ? maskDecimal(value.toFixed(1), { precisao: 1, ...props }) : '';
};

export const maskDecimal2 = (value: any, props: IDecimalProps | undefined = undefined): string => {
    return typeof (value) === 'number' ? maskDecimal(value.toFixed(2), { precisao: 2, ...props }) : '';
};

export const maskDecimal1PermiteSinal = (value: any, props: IDecimalProps | undefined = undefined): string => {
    if (value === '-') {
        return value;
    }
    return typeof (value) === 'number' ? maskDecimal(value.toFixed(1), { precisao: 1, permiteSinal: true, ...props }) : '';
};

export const maskDecimal2PermiteSinal = (value: any, props: IDecimalProps | undefined = undefined): string => {
    if (value === '-') {
        return value;
    }
    return typeof (value) === 'number' ? maskDecimal(value.toFixed(2), { precisao: 2, permiteSinal: true, ...props }) : '';
};

export const maskMoney2 = (value: any, props: IDecimalProps | undefined = undefined): string => {
    return typeof (value) === 'number' ? maskDecimal(value.toFixed(2), { precisao: 2, prefixo: 'R$', ...props }) : '';
};

export const maskPercent1 = (value: any, props: IDecimalProps | undefined = undefined): string => {
    return typeof (value) === 'number' ? maskDecimal((value * 100).toFixed(1), { precisao: 1, sufixo: '%', ...props }) : '';
};

export const maskPercent2 = (value: any, props: IDecimalProps | undefined = undefined): string => {
    return typeof (value) === 'number' ? maskDecimal((value * 100).toFixed(2), { precisao: 2, sufixo: '%', ...props }) : '';
};

export const unmaskDecimal = (value: string, props: IDecimalProps): number | any => {
    props = initDecimalProps(props);

    let onlyNumbers = value.match(/\d+/g) || [];
    let numbers = onlyNumbers.join('');
    let sinal = props.permiteSinal ? value[0] === '-' || value[0] === '+' ? value[0] : '' : '';

    if (!numbers) {
        return sinal;
    }

    if (parseInt(numbers) === 0) {
        return parseFloat(`${sinal}0`);
    }

    let quantZeros = props.precisao - 1;
    for (let index = 1; index <= props.precisao; index++) {
        const integerNumber = parseInt(numbers);
        if (integerNumber < Math.pow(10, index)) {
            let zeros = new Array(quantZeros + 1).join('0');
            return parseFloat(`${sinal}0.${zeros}${parseInt(numbers)}`);
        }
        quantZeros--;
    }

    const number = parseInt(numbers.substr(0, numbers.length - props.precisao)) + '.' + numbers.substr(numbers.length - props.precisao, props.precisao);
    const decimal = parseFloat(`${sinal}${number}`);
    return decimal;
};

const initDecimalProps = (props: IDecimalProps) => {
    props.permiteSinal = props.permiteSinal || false;
    props.prefixo = props.prefixo || '';
    props.sufixo = props.sufixo || '';
    props.required = props.required || false;
    return props;
};

export const maskMoneyEntradaSaida = (value: number): string => {
    return maskDecimal(value.toFixed(2), { precisao: 2, prefixo: 'R$', sufixo: value < 0 ? ' E' : ' S' });
};

