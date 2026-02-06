// svgr-template.cjs
const template = (
    { componentName, imports, props, jsx },
    { tpl },
) => {
    const exportName = /^\d/.test(componentName)
        ? `Svg${componentName}`
        : componentName;

    return tpl`
    ${imports}

    export const ${exportName} = (${props}) => {
      return (${jsx});
    };
  `;
};

module.exports = template;
