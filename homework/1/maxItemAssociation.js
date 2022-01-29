function getMaxItemAssociation(arrraysGrociers) {
    const recommendations = []; //Будем складывать сюда группы рекомендациий
    arrraysGrociers.forEach(  (currentItem ) => {
        if (recommendations.length == 0) {
            recommendations.push(currentItem); // первый раз кладём покупки первого пользователя в рекомендации
        } else {
            skipNext = false;
            //Просмотрим каждую рекомендацию и есть ли пересечение с текущей покупкой
            recommendations.forEach((rec,id) =>{
                if (skipNext) {
                    return;
                }
                let intersection = rec.filter(x => currentItem.includes(x));
                //Если есть пересение покупки с рекомендацией, то объединяем массивы
                if (intersection.length != 0) {
                    let difference = currentItem.filter(x => !rec.includes(x));
                    recommendations[id] = [...recommendations[id], ... difference];
                    skipNext = true;
                }
            })
            //Если объединения не произошло, то это новая рекомендация
            if (!skipNext) {
                recommendations.push(currentItem);
            }
        }
    });
    return recommendations
}

console.log(getMaxItemAssociation( [["a", "b"], ["a", "c"], ["d", "e"]]));
console.log(getMaxItemAssociation( [["q", "w", 'a'], ["a", "b"], ["a", "c"], ["q", "e"], ["q", "r"]]));
console.log(getMaxItemAssociation( [["q", "w", 'a'], ["a", "b"], ["e", "c"], ["q", "e"], ["q", "r"]])); // не работает