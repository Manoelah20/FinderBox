// src/utils/itemIcons.tsx
import React from 'react';
import { 
  FiKey, 
  FiCreditCard, 
  FiSmartphone, 
  FiPackage, 
  FiEye, 
  FiWatch, 
  FiHeadphones, 
  FiBook, 
  FiUmbrella, 
  FiShoppingBag,
  FiMonitor,
  FiCamera,
  FiWifi,
  FiHardDrive,
  FiBox
} from 'react-icons/fi';
import { 
  FaGlasses,
  FaShoePrints,
  FaRing,
  FaGem,
  FaHatCowboy,
  FaWallet,
  FaChargingStation
} from 'react-icons/fa';
import { 
  BsTablet,
  BsPhone,
  BsBackpack
} from 'react-icons/bs';

export const getItemIcon = (category: string, description?: string): React.ReactNode => {
  const icons: { [key: string]: React.ReactNode } = {
    'Chaves': <FiKey size={48} />,
    'Carteira/Documentos': <FiCreditCard size={48} />,
    'Eletrônico': <FiSmartphone size={48} />,
    'Mochila': <BsBackpack size={48} />,
    'Mochila Azul': <BsBackpack size={48} />,
    'Óculos': <FaGlasses size={48} />,
    'Relógio': <FiWatch size={48} />,
    'Fone de Ouvido': <FiHeadphones size={48} />,
    'Livro': <FiBook size={48} />,
    'Guarda-chuva': <FiUmbrella size={48} />,
    'Casaco': <FiShoppingBag size={48} />,
    'Tênis': <FaShoePrints size={48} />,
    'Anel': <FaRing size={48} />,
    'Brincos': <FaGem size={48} />,
    'Cartão': <FiCreditCard size={48} />,
    'Chapéu': <FaHatCowboy size={48} />,
    'Bolsa': <FiShoppingBag size={48} />,
    'Notebook': <FiMonitor size={48} />,
    'Tablet': <BsTablet size={48} />,
    'Câmera': <FiCamera size={48} />,
    'Fone': <FiHeadphones size={48} />,
    'Carregador': <FaChargingStation size={48} />,
    'Outro': <FiPackage size={48} />,
    // Mapeamento para categorias em minúsculas (usadas no mock)
    'chave': <FiKey size={48} />,
    'documentos': <FiCreditCard size={48} />,
    'eletrônico': <FiSmartphone size={48} />,
    'bolsa': <BsBackpack size={48} />,
    'acessórios': <FaGlasses size={48} />
  };

  // Se a descrição mencionar "azul", usar mochila azul
  if (description && description.toLowerCase().includes('azul')) {
    return icons['Mochila Azul'];
  }

  return icons[category] || icons['Outro'];
};

export default getItemIcon;
