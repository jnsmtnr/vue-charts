<template>
    <div>
        <div id="column">
            <svg :width="WIDTH" :height="HEIGHT">
                <g
                    v-for="(column, i) in columns"
                    :key="i"
                >
                    <rect
                        :x="column.x"
                        :y="column.y"
                        :width="column.width" 
                        :height="column.height" 
                        fill="red"
                    />
                    <text
                        :x="column.x + column.width / 2"
                        :y="column.y + column.height / 2"
                        text-anchor="middle"
                        fill="white"
                    >
                        {{ column.label }}
                    </text>
                </g>
            </svg>
        </div>
        <div class="data">
            <div v-for="(d, i) in data" :key="i" class="data-row">
                <input v-model="data[i].label"> <button @click="dec(i)">-</button> {{ d.value }} <button @click="inc(i)">+</button> <button @click="del(i)">delete</button>
            </div>
        </div>
        <button @click="add">Add new column</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent({
    setup() {
        const WIDTH = 800;
        const HEIGHT = 300;

        const data = ref([
            {
                label: 'IPA',
                value: 8
            },
            {
                label: 'APA',
                value: 5
            },
            {
                label: 'NEIPA',
                value: 7
            },
        ])

        const columns = computed(() => {
            const maxValue = Math.max(...data.value.map(d => d.value));

            const columnWidth = WIDTH / (data.value.length * 2);

            return data.value.map((d, i) => {
                const columnHeight = HEIGHT * d.value / maxValue

                return {
                    label: d.label,
                    x: columnWidth * (0.5 + 2 * i),
                    y: HEIGHT - columnHeight,
                    width: columnWidth,
                    height: columnHeight,
                }
            });
        })

        const inc = (index: number) => {
            const newData = {
                ...data.value[index],
                value: data.value[index].value + 1,
            }

            data.value.splice(index, 1, newData)
        }

        const dec = (index: number) => {
            const newData = {
                ...data.value[index],
                value: data.value[index].value - 1,
            }

            data.value.splice(index, 1, newData)
        }

        const del = (index: number) => {
            data.value.splice(index, 1)
        }

        const add = () => {
            data.value.push({
                label: 'new',
                value: 5
            })
        }

        return { 
            WIDTH, HEIGHT, data, columns, 
            inc, dec, del, add
        }
    },
})
</script>

<style scoped>
    #column {
        width: min-content;
        margin: 0 auto;
        padding: 1em;
    }

    svg {
        border: 1px solid black;
    }

    .data-row {
        margin: 1em 0;
    }
</style>
