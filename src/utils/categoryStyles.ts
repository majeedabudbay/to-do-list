export interface CategoryStyle {
  color: string;
  backgroundColor: string;
  width: number;
  height: number;
  gap: number;
  borderRadius: number;
  padding: number;
}

export const categoryStyles: Record<string, CategoryStyle> = {
  pet: {
    color: '#FFD332',
    backgroundColor: '#FFF6D4',
    width: 20,
    height: 20,
    gap: 5,
    borderRadius: 6,
    padding: 2,
  },
  personal: {
    color: '#F478B8',
    backgroundColor: '#FFE4F2',
    width: 20,
    height: 20,
    gap: 5,
    borderRadius: 6,
    padding: 2,
  },
  selfcare: {
    color: '#0087FF',
    backgroundColor: '#E7F3FF',
    width: 20,
    height: 20,
    gap: 5,
    borderRadius: 6,
    padding: 2,
  },
  shop: {
    color: '#FF9142',
    backgroundColor: '#FFE6D4',
    width: 20,
    height: 20,
    gap: 5,
    borderRadius: 6,
    padding: 2,
  },
  work: {
    color: '#9260F4',
    backgroundColor: '#EDE4FF',
    width: 20,
    height: 20,
    gap: 5,
    borderRadius: 6,
    padding: 2,
  },
};

export const getCategoryStyle = (category: string): CategoryStyle => {
  return categoryStyles[category] || categoryStyles.personal; // fallback to personal
};

export const getCategoryIconStyle = (category: string) => {
  const style = getCategoryStyle(category);
  return {
    color: style.color,
    backgroundColor: style.backgroundColor,
    width: `${style.width}px`,
    height: `${style.height}px`,
    borderRadius: `${style.borderRadius}px`,
    padding: `${style.padding}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
}; 