function renderTableHtml(parentElement, data) {
  const titles = Object.keys(data);
  const matrix = Object.values(data);

  parentElement.innerHTML = `
    <table>
      ${matrix
        .map((values, index) => {
          return `
          <tr>
            <td>${titles[index]}</td>
            ${values
              .map((value) => {
                return `<td>${value}</td>`;
              })
              .join("\n")}
          </tr>`;
        })
        .join("\n")}
    </table>
  `;
}

export default renderTableHtml;
