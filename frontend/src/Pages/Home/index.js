import React, { useEffect, useState } from "react";
import LogoImam from "../../assets/logoimam.png";
import jpgtools from "../../assets/output-onlinejpgtools.png";
import { useNavigate } from "react-router-dom";
import { getRecords, getSingleRecord } from "../../utils/index";
import AllRecords from "../AllRecords/index";
import MenuIcon from "../../assets/menu.png"

const Home = () => {
  const PASSWORD = "1234";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLogged] = useState(false);
  const [loginModalOpen, setloginModalOpen] = useState(false);
  const [dalModalOpen, setdalModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavLinks = () => {
    setIsOpen(!isOpen);
  };

  //Function for opening login modal
  const openLoginModal = () => {
    setloginModalOpen(true);
  };

  //Function for closing login modal
  const closeLoginModal = () => {
    setloginModalOpen(false);
  };

  //Function for opening dal modal
  const openDalModal = () => {
    setdalModalOpen(true);
  };

  //Function for closing dal modal
  const closeDalModal = () => {
    setdalModalOpen(false);
  };

  //Function to handle login
  const handleLogin = (event) => {
    event.preventDefault();
    const password = event.target.elements.password.value;
    if (password === "") {
      return;
    }
    if (password === PASSWORD) {
      setLogged(true);
    } else {
      alert("كلمة المرور خاطئة");
    }
    setIsOpen(false);
    closeLoginModal();
  };

  //Function to handle logout
  const handleLogout = () => {
    setLogged(false);
  };

  //Function to close backdrop on click
  const handleBackdrop = () => {
    if (loginModalOpen) {
      closeLoginModal();
    } else if (dalModalOpen) {
      closeDalModal();
    } else {
      return;
    }
  };

  //Function for triggerig the searcb
  const handleSubmit = async () => {
    setLoading(true);
    const data = await getRecords();
    setLoading(false);
    navigate("/record", { state: { records: data } });
  };

  //Function for triggerig the search
  const handleSearch = async (event) => {
    event.preventDefault();

    const query = event.target.elements.query.value;
    if (query === "") {
      return;
    }
    setLoading(true);
    const data = await getSingleRecord(query);
    setLoading(false);
    if (data) {
      navigate("/record", { state: { records: data } });
    }
  };

  //Function for handling quick access
  const handleQuickAccess = async (query) => {
    if (query === "") {
      return;
    }
    setLoading(true);
    const data = await getSingleRecord(query);
    setLoading(false);
    if (data) {
      navigate("/record", { state: { records: data } });
    }
  };

  //Function responsible for copying
  const handleCopy = (id) => {
    if (id === "") {
      return;
    }
    // Get the text field
    var copyText = document.getElementById(id);

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    alert("تم نسخ : " + copyText.value);
  };

  return (
    <>
      {/* <div className="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
    </div> */}
      <div>
        <div>
          {/* Header Section */}
          <div className="header">
            <nav>
              <img className="logo" src={LogoImam} />
              {!loggedIn && (
                <div
                  className={`nav-links ${isOpen ? "open" : ""}`}
                  id="navlinks"
                >
                  <ul>
                    <li onClick={openDalModal} style={{ cursor: "pointer" }}>
                      <a id="dalBtn">دليل</a>
                    </li>
                    <li>
                      <a
                        href="https://iussb.imamu.edu.sa/PROD_ar/twbkwbis.P_GenMenu?name=homepage"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                         الخدمات الذاتية
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://imamu.edu.sa/Pages/default.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        موقع الجامعة
                      </a>
                    </li>
                    <li>
                      <a href="mailto:DaleelTheGuide@gmail.com">الشكاوي</a>
                    </li>
                    <li onClick={openLoginModal} style={{ cursor: "pointer" }}>
                      <a id="loginBtn">المسؤول</a>
                    </li>
                  </ul>
                </div>
              )}

              {loggedIn && (
                <div
                  className={`nav-links ${isOpen ? "open" : ""}`}
                  id="navlinks"
                >
                  <ul>
                    <li
                      onClick={() => {
                        navigate("/add-record");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <a> إضافة سجل</a>
                    </li>

                    <li onClick={handleLogout} style={{ cursor: "pointer" }}>
                      <a>تسجيل الخروج</a>
                    </li>
                  </ul>
                </div>
              )} 

              <div className="open-menu" onClick={toggleNavLinks}><img src={MenuIcon} alt="toggle menu" height="20px" width="20px"/></div>
            </nav>
            {/* Login Modal */}
            <div
              className="modal"
              id="loginModal"
              style={{
                display: loginModalOpen ? "block" : "none",
                zIndex: 1000,
              }}
            >
              <div className="modal-content">
                <span className="close" onClick={closeLoginModal}>
                  &times;
                </span>
                <h6>تسجيل الدخول</h6>
                <form onSubmit={handleLogin}>
                  <br />
                  <input
                    type="password"
                    id="password"
                    placeholder="ادخل كلمة السر"
                    name="password"
                    required
                  />
                  <br />
                  <button type="submit">
                    <span>دخول</span>
                  </button>
                </form>
              </div>
            </div>

            {/* dal modal */}
            <div
              className="modal"
              id="dalModal"
              style={{ display: dalModalOpen ? "block" : "none" }}
            >
              <div className="modal-con">
                <span onClick={closeDalModal} className="close2">
                  &times;
                </span>
                <h3> عن دليل</h3>
                <b/>
                <form>
                  <p>
                    دليل هو موقع طور من قبل فريق من طلبة علوم الحاسب في جامعة
                    الإمام محمد بن سعود الإسلامية، لمساعدة الطلاب والزائرين في
                    إيجاد مكاتب أعضاء هيئة التدريس و الموظفين بوقت قياسي، عن
                    طريق توفير خريطة رسومية توضح موقع المكتب مرفقة بمعلومات
                    .صاحب المكتب
                  </p>
                  <br />
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
        {loggedIn ? (
          <AllRecords />
        ) : (
          <>
            <section className="middle">
              <div className="text-box">
                <h1>
                  <img src={jpgtools} />
                </h1>
                {loading ? (
                  <h1>جاري البحث، الرجاء الانتظار</h1>
                ) : (
                  <p className="search" id="searchButton">
                    <form onSubmit={handleSearch} className="search-bar">
                      <input
                        type="search"
                        placeholder="...البحث"
                        name="query"
                      />
                    </form>
                  </p>
                )}
              </div>
            </section>
         

          {/* quick access */}
            <footer>
              <section className="services">
                <h5>الخدمات المقترحة</h5>
                <div className="containerBottom container">
                  {loggedIn && (
                    <div className="add">
                      <h8>+</h8>
                    </div>
                  )}
                  <div className="scrollable-box">
                    <div
                      className="box"
                      onClick={() => {
                        handleQuickAccess("لجنة الاعذار");
                      }}
                    >
                      <h7>لجنة الأعذار</h7>
                    </div>
                    <div
                      className="box"
                      onClick={() => {
                        handleQuickAccess("وحدة التدريب");
                      }}
                    >
                      <h7>وحدة التدريب</h7>
                    </div>
                    <div
                      className="box"
                      onClick={() => {
                        handleQuickAccess("شؤون الطالبات");
                      }}
                    >
                      <h7> شؤون الطالبات</h7>
                    </div>
                    <div
                      className="box"
                      onClick={() => {
                        handleQuickAccess("الاخصائية النفسية");
                      }}
                    >
                      <h7>الاخصائية النفسية</h7>
                    </div>
                    <div
                      className="box"
                      onClick={() => {
                        handleQuickAccess("وحدة النشاط");
                      }}
                    >
                      <h7>وحدة النشاط</h7>
                    </div>
                  </div>
                </div>
              </section>
            </footer>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
