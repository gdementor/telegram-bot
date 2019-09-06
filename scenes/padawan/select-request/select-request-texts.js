module.exports = {
  messages: {
    enter: () => {
      return [
        "<b>Выберите категорию запроса</b>",
      ].join("\n");
    }
  },
  buttons: {
    codeReview: "Запросить Code Review",
    ask: "Обсудить проблему",
    growth: "Получить совет по развитию",
    technology: "Разобраться с технологией",
    cancel: "✖️ Отмена"
  }
};
