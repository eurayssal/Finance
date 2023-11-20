import styled from "@emotion/styled";
import { buttonVariant } from "./props";

export const buttonJss = styled.button<{ variant?: buttonVariant }>(({
  variant
}) => {
  if (variant === "primary") {
    return {
      backgroundColor: '#1677ff',
      color: '#fff',
      padding: '4px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      border: 'none',
      height: '32px',
      cursor: 'pointer',
      ':active': {
        color: '#fff',
        backgroundColor: '#0958d9',
      },

      ':hover': {
        backgroundColor: '#4096ff'
      },

      ':focus-visible': {
        outline: '4px solid #91caff',
        outlineOffset: '1px',
        transition: 'outline-offset 0s,outline 0s',
      }
    };
  } else if (variant === 'secondary') {
    return {
      padding: '4px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      height: '32px',
      cursor: 'pointer',
      color: '#404040',
      backgroundColor: '#fff',
      border: '1px solid #d9d9d9',
      boxShadow: '0 2px 0 rgb(237 0 0 / 2%)',

      ':active': {
        color: '#0958d9',
        border: '1px solid #0958d9',
        boxShadow: '0 2px 0 rgb(237 0 0 / 2%)',
        transition: 'cubic-bezier(0.55, 0.07, 0.69, 0.69)',
      },

      ':hover': {
        color: '#4096ff',
        border: '1px solid #4096ff',
        boxShadow: '0 2px 0 rgb(237 0 0 / 2%)',
      }
    };
  } else if (variant === 'white') {
    return {
      padding: '4px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      height: '32px',
      cursor: 'pointer',
      color: '#0958D9',
      backgroundColor: '#fff',
      border: '1px solid #fff',
      boxShadow: '0 2px 0 rgb(237 0 0 / 2%)',
    }
  } else if (variant === 'borderWhite') {
    return {
      padding: '4px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      height: '32px',
      cursor: 'pointer',
      color: '#fff',
      backgroundColor: 'rgba(0 0 0 / 0%)',
      border: '1px solid #fff',
      boxShadow: '0 2px 0 rgb(237 0 0 / 2%)',
    }
  } else if (variant === 'danger') {
    return {
      padding: '4px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      height: '32px',
      cursor: 'pointer',
      color: '#ff4d4f',
      backgroundColor: '#fff',
      border: '1px solid #ff4d4f',
      borderColor: '1px solid #ff4d4f',

      ':active': {
        color: '#d9363e',
        borderColor: 'transparent',
      },

      ':hover': {
        color: '#ff7875',
        borderColor: '#ffa39e'

      }
    };
  } else if (variant === "text") {
    return {
      padding: '4px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      height: '32px',
      cursor: 'pointer',
      backgroundColor: '#fff',
      color: '#404040',
      borderColor: 'transparent',

      ':active': {
        color: '#404040',
        backgroundColor: '#00000026',
        borderColor: 'transparent',
      },

      ':hover': {
        backgroundColor: '#0000000f',

      }
    };
  } else if (variant === "link") {
    return {
      padding: '4px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      height: '32px',
      cursor: 'pointer',
      backgroundColor: '#fff',
      color: '#1677ff',
      borderColor: 'transparent',

      ':active': {
        color: '#0958d9',
        borderColor: 'transparent',
      },

      ':hover': {
        color: '#69b1ff',

      }
    };
  } else if (variant === "linkWhite") {
    return {
      padding: '4px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      height: '32px',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: '#fff',
      borderColor: 'transparent',
    };
  } else if (variant === "icon") {
    return {
      backgroundColor: '#1677ff',
      color: '#fff',
      padding: '4px 8px',
      borderRadius: '60px',
      fontSize: '16px',
      border: 'none',
      height: '32px',
      cursor: 'pointer',

      ':active': {
        color: '#fff',
        backgroundColor: '#0958d9',
      },

      ':hover': {
        backgroundColor: '#4096ff'
      },

      ':focus-visible': {
        outline: '4px solid #91caff',
        outlineOffset: '1px',
        transition: 'outline-offset 0s,outline 0s',
      }
    };
  }
});
