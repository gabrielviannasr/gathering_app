<template>
  <q-page>
    <q-card borderd class="q-ma-lg">
      <q-card-section>
        <q-breadcrumbs>
          <template v-slot:separator>
            <q-icon size="1.5em" name="chevron_right" color="primary" />
          </template>
          <q-breadcrumbs-el label="Home" icon="home" to="/" />
          <q-breadcrumbs-el label="Gathering" icon="widgets" />
        </q-breadcrumbs>
        <!-- SEARCH -->
        <q-card-section class="row q-col-gutter-md">
          <q-input
            outlined
            clearable
            clear-icon="close"
            v-model="model.year"
            label="Ano:"
            class="col-xs-12 col-sm-3"
          />

          <q-input
            outlined
            clearable
            clear-icon="close"
            v-model="model.name"
            label="Nome:"
            class="col-xs-12 col-sm-6"
          />

          <q-input
            outlined
            clearable
            clear-icon="close"
            v-model="model['player.username']"
            label="Username:"
            class="col-xs-12 col-sm-3"
          />
        </q-card-section>
        <!-- ACTIONS -->
        <q-card-actions class="q-pa-md">
          <q-btn
            icon="search"
            label="Pesquisar"
            color="primary"
            type="submit"
            @click="onSubmit"
          />
          <q-btn
            icon="mdi-eraser"
            label="Limpar"
            type="button"
            color="primary"
            @click="reload"
            flat
          />
          <q-space />
          <q-btn icon="add" label="Novo" color="green" to="/" />
        </q-card-actions>
      </q-card-section>
    </q-card>
    <!-- RESULTS -->
    <q-card borderd class="q-ma-lg">
      <q-card-section>
        <q-table
          row-key="id"
          separator="cell"
          title="Resultados"
          :rows="store.gatherings"
          :columns="tableProps.columns"
          :pagination="tableProps.pagination"
        >
          <!-- SEQ -->
          <template v-slot:body-cell-seq="props">
            <q-td :props="props">{{ props.rowIndex + 1 }}</q-td>
          </template>
          <!-- ACTIONS -->
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <q-btn dense color="orange" icon="mdi-pencil" title="Editar" />
                <q-btn dense color="primary" icon="mdi-cards" title="Eventos" />
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { gatheringStore } from 'stores/gathering'
import _ from 'lodash'

export default defineComponent({
  name: 'GatheringSearch',

  setup() {
    const store = gatheringStore()

    let model = ref({
      name: null,
      year: null,
      'player.username': null,
    })

    let payload = ref({
      name: null,
      year: null,
      'player.username': null,
    })

    const onSubmit = async () => {
      payload.value = _.cloneDeep(model.value)
      console.log('payload', payload.value)
      await store.getList(payload.value)
    }

    const reload = () => {
      console.log('model', model.value)
      model.value = {
        name: null,
        year: null,
        'player.username': null,
      }
    }

    const tableProps = {
      initialPagination: {
        descending: false,
        page: 1,
        rowsPerPage: 10,
        sortBy: null,
      },
      pagination: {
        rowsPerPage: 10,
      },
      columns: [
        {
          name: 'seq',
          align: 'center',
          label: '#',
          sortable: false,
        },
        {
          name: 'year',
          label: 'Ano',
          align: 'center',
          field: (row) => row.year,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'name',
          label: 'Nome',
          align: 'center',
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'player.username',
          label: 'Username',
          align: 'center',
          field: (row) => row.username,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'actions',
          label: 'Ação',
          align: 'center',
          sortable: false,
        },
      ],
    }

    return {
      model,
      payload,
      store,
      tableProps,
      onSubmit,
      reload,
    }
  },
})
</script>
