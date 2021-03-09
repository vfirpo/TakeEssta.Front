<template>
  <div class="row">
    <div class="col-md-1"></div>
    <div class="col-md-10">
      <div id="loginContainer">
        <img
          id="logoHead"
          src="/Img/logo_Xava.jpg"
          style="margin-top: 30px; margin-bottom: 10px; max-height: 170px"
        />

        <div id="loginMain" class="sombraBox">
          <div id="txtIS">Iniciar sesión</div>

          <input
            style="height: 45px"
            class="form-control inputNew"
            type="text"
            name="usu"
            id="usu"
            placeholder="Usuario"
            autofocus="autofocus"
            v-model="dato.user"
            @change="hiddenAlert()"
          />
          <br />
          <input
            style="height: 45px"
            class="form-control inputNew"
            type="password"
            name="passw"
            id="passw"
            placeholder="Contraseña"
            v-model="dato.pass"
            @change="hiddenAlert()"
          />
          <br />
          <button
            id="btn_login"
            v-on:click="fcn_login()"
            style="width: 100%"
            type="button"
            class="btn btn-primary"
          >
            Iniciar sesión
          </button>
          <div id="div_mensajeNew">
            <div>
              <b-alert v-model="alert.visible" variant="danger" show
                ><i class="fas fa-exclamation-triangle"></i>
                {{ alert.text }}</b-alert
              >
            </div>
          </div>
          <div id="txtBottDL">
            Xava 2021 v2.3.0 - Todos los derechos reservados
          </div>
        </div>

        <div style="margin-top: 10px">
          <a target="_blank" href="https://www.datalive.com.ar"
            ><img
              src="/Img/logo_Xava.jpg"
              style="height: 35px; margin-bottom: 20px"
          /></a>
        </div>
      </div>
    </div>
    <div class="col-md-1"></div>
  </div>
</template>

<script>
export default {
  name: "login",

  data() {
    return {
      alert: { text: "", visible: false },
      dato: {
        user: "",
        pass: "",
      },
      user: null,
    };
  },
  mounted() {
    document.getElementById("header_principal").hidden = true;
  },

  beforeDestroy() {
    document.getElementById("header_principal").hidden = false;
  },

  methods: {
    hiddenAlert() {
      this.alert.visible = false;
    },

    async fcn_login() {
      let params = "?user=" + this.dato.user + "&password=" + this.dato.pass;

      this.user = await this.$global.callGetAPI("Users/ValidateUser" + params);

      if (this.user.item) {
        this.$global.setCurrentUser(this.user.item);
        var caja = await this.$global.getCurrentCashBox(this.user.item.sucursal.id );
        this.$store.commit("changeCashBox", caja.isOpen);

        this.$router.go(-1); // .push('/')
      } else {
        this.alert.visible = true;
        this.alert.text = this.user.message;
      }
    },
  },
};
</script>

<style>
body {
  font-family: "fontBaseRegular";
  overflow-x: hidden;
}

#segundos_restantes {
  font-size: 18px;
}

#DVMsj {
  background-color: #f44336;
  color: white;
  width: max-content;
  padding: 10px;
  border-radius: 3px;
}

#btn_abono_pago {
  font-size: 18px;
  border-radius: 0px;
}

.sombraBox {
  box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42),
    0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}

.sombraBox2 {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.4);
}

.sombraBox3 {
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
}

#loginContainer {
  text-align: center;
}

#loginMain {
  text-align: center;
  border: solid 1px white;
  width: 350px;
  margin: auto;
  border-radius: 5px;
  background-color: white;
  padding: 30px;
}

.inputNew {
  border-top: solid 3px;
  border-color: #3f51b5;
}

#div_mensajeNew {
  margin-top: 10px;
  margin-bottom: -10px;
}

#txtIS {
  font-size: 20px;
  margin-top: -10px;
  margin-bottom: 20px;
}

#txtBottDL {
  font-size: 12px;
  color: #9e9e9e;
  margin-top: 25px;
  margin-bottom: -20px;
}

.txtVerde {
  color: #4caf50 !important;
}

.txtGris {
  color: #999 !important;
}

.txtRojo {
  color: #f44336 !important;
}

.txtNaranja {
  color: #ff9800 !important;
}

.txtBlueCool {
  color: #607d8b !important;
}

.subMarco {
  border-radius: 3px;
  border-top: solid 30px;
  padding: 15px;
  width: fit-content;
  border-color: #8bc34a;
  margin-bottom: 20px;
}

.subTitle {
  color: white;
  margin-top: -40px;
  margin-bottom: 30px;
}

.wid100 {
  width: 100%;
}
</style>