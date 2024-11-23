
const Footer = () => (
    <footer>
        <div className="main-div-block">
            <div className="footer-center">
                <ul>
                    <li><h2>Навигация</h2></li>
                    <li><a href='/'>Главная страница</a></li>
                    <li><a href='/profile'>Профиль пользователя</a></li>
                </ul>
                <div>
                    <p>
                        Используя данный сайт, вы автоматически принимаете условия <a href="/">договор-оферты</a>.
                    </p>

                    <p>
                        Регистрируясь на сайте, вы принимаете <a href="/">Положение</a> и <a href="/">Согласие на обработку персональных данных</a>.
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                © 2024 student-news.ru. Все права защищены.
            </div>
        </div>
    </footer>
)
export default Footer