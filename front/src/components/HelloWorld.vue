<template>
  <div class="container mx-auto">
    <div class="row btn btn-info btn-block">
      Prueba desarrollador junior LOGYCA
    </div>
    <div class="row">
      <div class="col-6 mx-auto mt-3">
        <form @submit.prevent="handleSubmitForm">
          <select class="form-control form-select form-select-lg mb-3" v-model="selectedItem" required>
            <option value="1" selected>Números primos sin base de datos</option>
            <option value="2">Números primos con base de datos</option>
            <option value="3">Números primos gemelos sin base de datos</option>
            <option value="4">Números primos gemelos con base de datos</option>
          </select>
          <input type="number" class="form-control" required placeholder="Ingrese el valor de n" v-model="n">
          <input type="submit" class="mt-3 btn btn-success btn-block">
        </form>
      </div>
      <div class="col-7 mt-4 mx-auto" v-if="selectedItem>2">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th>Gemelo1</th>
              <th>Gemelo2</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pareja in primos" :key="pareja[0]">
              <td>{{pareja[0]}}</td>
              <td>{{pareja[1]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-7 mt-4 mx-auto" v-if="selectedItem<=2">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th>Número primo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="primo in primos" :key="primo">
              <td>{{primo}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  data(){
    return {
      primos: null,
      n: null,
      selectedItem: 1
    }
  },
  methods: {
    async handleSubmitForm() {
      var apiURL = 'http://localhost:8080/api/numeros/primosnobd'
      if(this.selectedItem == 1){
        apiURL = "http://localhost:8080/api/numeros/primosnobd";
      }else{
        if(this.selectedItem == 2){
          apiURL = "http://localhost:8080/api/numeros/primos";
        }else{
          if(this.selectedItem ==3){
            apiURL = "http://localhost:8080/api/numeros/gemelosnobd"
          }else{
            if(this.selectedItem == 4){
              apiURL = "http://localhost:8080/api/numeros/gemelos"
            }
          }
        }
      }
      try {var res = await axios.post(apiURL, {
          numero: this.n
      })}
      catch(e){
        console.log(e)
      }
      this.primos = res.data
    }
  }
}

</script>

