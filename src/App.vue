<template>
  <div id="app">
    <div class="ui container form">
      <h1 class="ui header">黑貓維茲傷害計算表</h1>

      <div class="ui segment">

        <h2 class="ui dividing header">
          敵人資訊
        </h2>
        <div class="ui field">
          <h4 class="ui dividing header">全體敵人</h4>
          <div class="five fields">
            <div class="field">
              <label>屬性</label>
              <select
                class="ui search dropdown"
                v-model="glbEnType"
              >
                <option
                  v-for="item in MONSTER_TYPE"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="field">
              <label>屬性弱化</label>
              <input
                type="number"
                v-model.number="glbEnWeak"
              >
            </div>
            <div class="field">
              <label>屬性盾</label>
              <input
                type="number"
                v-model.number="glbEnShield"
              >
            </div>
            <div class="field">
              <label>反動弱化屬性</label>
              <select
                class="ui search dropdown clearable"
                v-model="glbEnSelfWeakType"
              >
                <option
                  v-for="item in WEAK_TYPE"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="field">
              <label>反動弱化數值(%數)</label>
              <input
                type="number"
                v-model.number="glbEnSelfWeak"
              >
            </div>
          </div>
        </div>

        <div
          class="ui form"
          v-for="(enemy, idx) in enemys"
          :key="'enemy' + idx"
        >
          <h4 class="ui dividing header">敵人 {{ idx + 1 }} </h4>
          <div class="five fields">
            <div class="field">
              <label>屬性 (必填)</label>
              <select
                class="ui search dropdown"
                v-model="enemy.type"
              >
                <option
                  v-for="item in MONSTER_TYPE"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="field">
              <label>屬性弱化</label>
              <input
                type="number"
                v-model.number="enemy.weak"  
              >
            </div>
            <div class="field">
              <label>屬性盾</label>
              <input
                type="number"
                v-model.number="enemy.shield"  
              >
            </div>
            <div class="field">
              <label>反動弱化屬性</label>
              <select
                class="ui search dropdown clearable"
                v-model="enemy.selfWeakType"
              >
                <option
                  v-for="item in WEAK_TYPE"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="field">
              <label>反動弱化數值(%數)</label>
              <input
                type="number"
                v-model.number="enemy.selfWeak"  
              >
            </div>
          </div>
        </div>

        <div class="ui container">
          <button
            class="ui labeled icon button"
            @click="addEnemy"
          >
            <i class="icon plus"></i>
            新增敵人
          </button>
          <button
            class="ui labeled icon button"
            @click="removeEnemy"
            v-show="enemys.length > 1"
          >
            <i class="icon minus"></i>
            刪除敵人
          </button>
        </div>
      </div>

      <div class="ui segment">
        <h2 class="ui dividing header">
          我方資訊
        </h2>
        <div class="ui field">
          <div class="field">
            <label>連鎖數</label>
            <input
              type="number"
              v-model.number="chains"
            >
          </div>
        </div>

        <div class="ui field">
          <h4 class="ui dividing header">我方全體</h4>
          <div class="five fields">
            <div class="field">
              <label>技能屬性(暫不開放)</label>
              <select
                class="ui search dropdown"
                multiple
                v-model="glbPnType"
                disabled
              >
                <option
                  v-for="item in ATTACK_TYPE"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="field">
              <label>攻擊力</label>
              <input
                type="number"
                v-model.number="glbPnAttack"
              >
            </div>
            <div class="field">
              <label>SS效果值</label>
              <input
                type="number"
                v-model.number="glbPnssAttack"
              >
            </div>
            <div class="field">
              <label>SS強化傷害</label>
              <input
                type="number"
                v-model.number="glbPnssIncrease"
              >
            </div>
            <div class="field">
              <label>特殊潛能</label>
              <input
                type="number"
                v-model.number="glbPnssPotential"
              >
            </div>
          </div>
        </div>

        <div
          class="ui field"
          v-for="(partner, idx) in partners"
          :key="'partner' + idx"
        >
          <h4 class="ui dividing header">我方 {{ idx + 1 }}</h4>
          <div class="five fields">
            <div class="field">
              <label>技能屬性 (必填)</label>
              <select
                class="ui search dropdown"
                multiple
                v-model="partner.type"
              >
                <option
                  v-for="item in ATTACK_TYPE"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="field">
              <label>攻擊力 (必填)</label>
              <input
                type="number"
                v-model.number="partner.attack"
              >
            </div>
            <div class="field">
              <label>SS效果值 (必填)</label>
              <input
                type="number"
                v-model.number="partner.ssAttack"
              >
            </div>
            <div class="field">
              <label>SS強化傷害</label>
              <input
                type="number"
                v-model.number="partner.ssIncrease"
              >
            </div>
            <div class="field">
              <label>特殊潛能</label>
              <input
                type="number"
                v-model.number="partner.ssPotential"
              >
            </div>
          </div>
        </div>

        <div class="ui container">
          <button
            class="ui labeled icon button"
            @click="addPartner"
          >
            <i class="icon plus"></i>
            新增我方
          </button>
          <button
            class="ui labeled icon button"
            @click="removePartner"
            v-show="partners.length > 1"
          >
            <i class="icon minus"></i>
            刪除我方
          </button>
        </div>
      </div>

      <div class="ui segment">
        <h2 class="ui dividing header">
          SS傷害
        </h2>

        <div class="field">
          <label>傷害倍率</label>
          <select
            class="ui search dropdown"
            v-model.number="multiplyDamge"
          >
            <option value="0.9">0.9倍</option>
            <option value="1">1倍</option>
            <option value="1.1">1.1倍</option>
          </select>
        </div>

        <table class="ui definition table">
          <thead>
            <tr>
              <th>
              <th
                v-for="(partner, idx) in partners"
                :key="'sspartner' + idx"
              >
                我方 {{ idx + 1 }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(enemy, idx) in enemys"
              :key="'ssenemy' + idx"
            >
              <td>
                敵人 {{ idx + 1 }}
              </td>
              <td
                v-for="(partner, pidx) in partners"
                :key="'sspartner' + pidx"
              >
                {{ Number(ssDamages[idx][pidx]).toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  <div class="ui inverted vertical footer segment">
    <div class="ui container">
      <p>Copyright © 2021 Alantea. All rights reserved.</p>
    </div>
  </div>
  </div>
</template>

<script>

import $ from 'jquery'

const WEAK_TYPE = 
  [
    {value: "", name: ""},
    {value: "1", name: "火"},
    {value: "2", name: "水"},
    {value: "3", name: "雷"},
    {value: "4", name: "光"},
    {value: "5", name: "闇"},
    {value: "12", name: "火水"},
    {value: "13", name: "火雷"},
    {value: "14", name: "火光"},
    {value: "15", name: "火闇"},
    {value: "21", name: "水火"},
    {value: "23", name: "水雷"},
    {value: "24", name: "水光"},
    {value: "25", name: "水闇"},
    {value: "31", name: "雷火"},
    {value: "32", name: "雷水"},
    {value: "34", name: "雷光"},
    {value: "35", name: "雷闇"},
    {value: "123", name: "火水雷"},
    {value: "45", name: "光闇"},
    {value: "12345", name: "全屬性"},
  ];

const MONSTER_TYPE =
  [
    {value: "", name: ""},
    {value: "1", name: "火"},
    {value: "2", name: "水"},
    {value: "3", name: "雷"},
    {value: "4", name: "光"},
    {value: "5", name: "闇"},
    {value: "6", name: "無"},
  ];

const ATTACK_TYPE = MONSTER_TYPE;

const ATTACK_MONSTER_LIST = 
  {
    "1": {
      "1": 1,
      "2": 0.5,
      "3": 1.5,
      "4": 1,
      "5": 1,
      "6": 1,
    },
    "2": {
      "1": 1.5,
      "2": 1,
      "3": 0.5,
      "4": 1,
      "5": 1,
      "6": 1,
    },
    "3": {
      "1": 0.5,
      "2": 1.5,
      "3": 1,
      "4": 1,
      "5": 1,
      "6": 1,
    },
    "4": {
      "1": 1,
      "2": 1,
      "3": 1,
      "4": 1,
      "5": 1.5,
      "6": 1,
    },
    "5": {
      "1": 1,
      "2": 1,
      "3": 1,
      "4": 1.5,
      "5": 1,
      "6": 1,
    },
    "6": {
      "1": 1,
      "2": 1,
      "3": 1,
      "4": 1.5,
      "5": 1,
      "6": 1,
    },
  }


export default {
  name: 'App',
  data: function () {
    return {
      globalEnemy: {
        type: "",
        weak: 0,
        shield: 0,
        selfWeakType: "",
        selfWeak: 0
      },
      enemys: [],
      globalPartner: {
        type: [],
        attack: 0,
        ssAttack: 0,
        ssIncrease: 0,
        ssPotential: 1,
      },
      partners: [],
      multiplyDamge: 1,
      chains: 0,
      MONSTER_TYPE: MONSTER_TYPE,
      WEAK_TYPE: WEAK_TYPE,
      ATTACK_TYPE: ATTACK_TYPE,
    }
  },
  computed: {
    newEnemy () {
      return {
        type: "",
        weak: 0,
        shield: 0,
        selfWeakType: "",
        selfWeak: 0
      }
    },
    glbEnType: {
      get: function () { return this.globalEnemy.type; },
      set: function (newVal) { this.globalEnemy.type = newVal; this.enemys.forEach(enemy => { enemy.type = newVal; }); }
    },
    glbEnWeak: {
      get: function () { return this.globalEnemy.weak; },
      set: function (newVal) { this.globalEnemy.weak = newVal; this.enemys.forEach(enemy => { enemy.weak = newVal; }); }
    },
    glbEnShield: {
      get: function () { return this.globalEnemy.shield; },
      set: function (newVal) { this.globalEnemy.shield = newVal; this.enemys.forEach(enemy => { enemy.shield = newVal; }); }
    },
    glbEnSelfWeakType: {
      get: function () { return this.globalEnemy.selfWeakType; },
      set: function (newVal) { this.globalEnemy.selfWeakType = newVal; this.enemys.forEach(enemy => { enemy.selfWeakType = newVal; }); }
    },
    glbEnSelfWeak: {
      get: function () { return this.globalEnemy.selfWeak; },
      set: function (newVal) { this.globalEnemy.selfWeak = newVal; this.enemys.forEach(enemy => { enemy.selfWeak = newVal; }); }
    },
    newPartner () {
      return {
        type: [],
        attack: 0,
        ssAttack: 0,
        ssIncrease: 0,
        ssPotential: 1,
      }
    },
    glbPnType: {
      get: function () { return this.globalPartner.type; },
      set: function (newVal) { this.globalPartner.type = Object.assign([], newVal); this.partners.forEach(partner => { partner.type = Object.assign([], newVal); }); }
    },
    glbPnAttack: {
      get: function () { return this.globalPartner.attack; },
      set: function (newVal) { this.globalPartner.attack = newVal; this.partners.forEach(partner => { partner.attack = newVal; }); }
    },
    glbPnssAttack: {
      get: function () { return this.globalPartner.ssAttack; },
      set: function (newVal) { this.globalPartner.ssAttack = newVal; this.partners.forEach(partner => { partner.ssAttack = newVal; }); }
    },
    glbPnssIncrease: {
      get: function () { return this.globalPartner.ssIncrease; },
      set: function (newVal) { this.globalPartner.ssIncrease = newVal; this.partners.forEach(partner => { partner.ssIncrease = newVal; }); }
    },
    glbPnssPotential: {
      get: function () { return this.globalPartner.ssPotential; },
      set: function (newVal) { this.globalPartner.ssPotential = newVal; this.partners.forEach(partner => { partner.ssPotential = newVal; }); }
    },
    ssDamages () {
      var res = [];
      const allssIncreases = this.partners.map(partner => partner.ssIncrease).reduce((a, b) => a + b, 0);

      for (let i = 0; i < this.enemys.length; i++) {
        const enemy = this.enemys[i];
        let enemyDamages = [];
        for (let j = 0; j < this.partners.length; j++) {
          const partner = this.partners[j];
          // Check data complete
          if(enemy.type == ""
          || partner.type.length == 0
          || partner.attack == 0
          || partner.ssAttack == 0) {
            enemyDamages.push("nodata");
            continue;
          }
          let baseDamage;
          let totalDamage;
          let partnerMulti;

          baseDamage = 
            (partner.attack) * 
            ((partner.ssAttack + allssIncreases) * 0.01) *
            ((100 + enemy.weak) * 0.01) *
            ((100 - enemy.shield) * 0.01) *
            ((100 + this.chains) * 0.01) *
            partner.ssPotential;

          partnerMulti = 0;
          partner.type.forEach(type => {
            partnerMulti += ATTACK_MONSTER_LIST[type][enemy.type] * 
              (enemy.selfWeakType.indexOf(type) != -1 ? (100 + enemy.selfWeak) * 0.01 : 1);
          });

          totalDamage = Math.round(partnerMulti * baseDamage * this.multiplyDamge);

          enemyDamages.push(totalDamage);
        }
        res.push(enemyDamages);
      }

      return res;
    }
  },
  methods: {
    addEnemy () {
      this.enemys.push(Object.assign({}, this.newEnemy));
    },
    removeEnemy () {
      if(this.enemys.length > 1) {
        this.enemys.pop();
      }
    },
    addPartner () {
      this.partners.push(Object.assign({}, this.newPartner));
    },
    removePartner () {
      if(this.partners.length > 1) {
        this.partners.pop();
      }
    },
  },
  updated () {
    $(this.$el).find('.dropdown').dropdown();
    $('.ui.selection.clearable.dropdown')
      .dropdown({
        clearable: true
      })
    ;
  },
  mounted () {
    // create one enemy and partner
    this.enemys.push(Object.assign({}, this.newEnemy));
    this.partners.push(Object.assign({}, this.newPartner));
  },
}
</script>

<style scoped>
</style>