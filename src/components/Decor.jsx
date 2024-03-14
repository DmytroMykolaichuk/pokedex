import css from './Decor.module.css';
console.log(css.list_decor)
export const Decor = () => {
    return(
        <>
            <ul className={`${css.list_decor} ${css.first_decor_list}`}>
                <li className={css.item_decor} style={{width:'5%'}}></li>
                <li className={css.item_decor} style={{width:'10%'}}></li>
                <li className={css.item_decor} style={{width:'15%'}}></li>
                <li className={css.item_decor} style={{width:'20%'}}></li>
                <li className={css.item_decor} style={{width:'25%'}}></li>
                <li className={css.item_decor} style={{width:'30%'}}></li>
                <li className={css.item_decor} style={{width:'100%'}}></li>
            </ul>
                <ul className={`${css.list_decor} ${css.second_decor_list}`}>
                <li className={css.item_decor} style={{width:'5%'}}></li>
                <li className={css.item_decor} style={{width:'10%'}}></li>
                <li className={css.item_decor} style={{width:'15%'}}></li>
                <li className={css.item_decor} style={{width:'20%'}}></li>
                <li className={css.item_decor} style={{width:'25%'}}></li>
                <li className={css.item_decor} style={{width:'30%'}}></li>
                <li className={css.item_decor} style={{width:'100%'}}></li>
            </ul>
        </>
    )
}