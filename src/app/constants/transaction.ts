
import {
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod
} from "@prisma/client";


export const TRANSACTION_TYPE_LABELS ={
    EXPENSE: 'Despesa',
    DEPOSIT: 'Depósito',
    INVESTMENT: 'Investimento',

}


export const TRANSACTION_CATEGORY_LABELS ={
    EDUCATION: 'Educaçâo',
    FOOD: 'Alimentação',
    ENTERTAINMENT:'Entretenimento',
    TRANSPORTATION: 'Transporte',
    HOUSING: 'Moradia',
    OTHER: 'Outros',
    SALARY: 'Salário',
    UTILITY: 'Utilidades',

}

export const TRANSACTION_PAYMENT_METHOD_LABELS ={
    BANK_TRANSFER: 'Transferência Bancária',
    BANK_SLIP: 'Boleto Bancário',
    CASH: 'Dinheiro',
    CREDIT_CARD: 'Cartão de Crédito',   
    DEBIT_CARD: 'Cartão de Débito',
    PIX: 'Pix',
    OTHER: 'Outros',


}

export const TRANSACTION_TYPE_OPTIONS = [
    {
        value: TransactionType.EXPENSE,
        label: TRANSACTION_TYPE_LABELS[TransactionType.EXPENSE],
    },
    {
        value: TransactionType.DEPOSIT,
        label: TRANSACTION_TYPE_LABELS[TransactionType.DEPOSIT],
    },
    {
        value: TransactionType.INVESTMENT,
        label: TRANSACTION_TYPE_LABELS[TransactionType.INVESTMENT],
    },

]
export const TRANSACTION_CATEGORY_OPTIONS = [
    {
        value: TransactionCategory.EDUCATION,
        label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.EDUCATION],
    
    },
    {
        value: TransactionCategory.FOOD,
        label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.FOOD],
    
    },
    {
        value: TransactionCategory.HOUSING,
        label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HOUSING],
    
    
    },
    {
        value: TransactionCategory.ENTERTAINMENT,
        label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.ENTERTAINMENT],
    
    
    },
    {
        value: TransactionCategory.TRANSPORTATION,
        label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.TRANSPORTATION],
    
    
    },
    {
        value: TransactionCategory.SALARY,
        label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.SALARY],
    
    
    },
    {
        value: TransactionCategory.UTILITY,
        label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.UTILITY],
    
    
    },
    {
        value: TransactionCategory.OTHER,
        label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.OTHER],
    
    
    },

]

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [ 
    {
        value: TransactionPaymentMethod.BANK_TRANSFER,
        label: TRANSACTION_PAYMENT_METHOD_LABELS
        [TransactionPaymentMethod.BANK_TRANSFER],
    },
    {
        value: TransactionPaymentMethod.BANK_SLIP,
        label: TRANSACTION_PAYMENT_METHOD_LABELS
        [TransactionPaymentMethod.BANK_SLIP],
    },
    {
        value: TransactionPaymentMethod.CASH,
        label: TRANSACTION_PAYMENT_METHOD_LABELS
        [TransactionPaymentMethod.CASH],
    },
    {
        value: TransactionPaymentMethod.CREDIT_CARD,
        label: TRANSACTION_PAYMENT_METHOD_LABELS
        [TransactionPaymentMethod.CREDIT_CARD],
    },
    {
        value: TransactionPaymentMethod.DEBIT_CARD,
        label: TRANSACTION_PAYMENT_METHOD_LABELS
        [TransactionPaymentMethod.DEBIT_CARD],
    },
    {
        value: TransactionPaymentMethod.PIX,
        label: TRANSACTION_PAYMENT_METHOD_LABELS
        [TransactionPaymentMethod.PIX],
    },
    {
        value: TransactionPaymentMethod.OTHER,
        label: TRANSACTION_PAYMENT_METHOD_LABELS
        [TransactionPaymentMethod.OTHER],
    },

]



