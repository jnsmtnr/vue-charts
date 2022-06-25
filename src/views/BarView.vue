<template>
    <div>
        <div id="bar">
            <svg :width="WIDTH" :height="height">
                <g
                    v-for="(bar, i) in bars"
                    :key="i"
                >
                    <rect
                        :x="bar.x"
                        :y="bar.y"
                        :width="bar.width" 
                        :height="bar.height" 
                        fill="red"
                    />
                    <text
                        :x="bar.x + bar.width / 2"
                        :y="bar.y + bar.height / 2"
                        text-anchor="middle"
                        alignment-baseline="central"
                        fill="white"
                    >
                        {{ bar.label }}
                    </text>
                </g>
            </svg>
        </div>
        <div class="data">
            <div v-for="(d, i) in data" :key="i" class="data-row">
                <input v-model="data[i].label"> <button @click="dec(i)">-</button> {{ d.value }} <button @click="inc(i)">+</button> <button @click="del(i)">delete</button>
            </div>
        </div>
        <button @click="add">Add new bar</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent({
    setup() {
        const WIDTH = 800;
        const height = computed(() => Math.max(data.value.length * 100, 300));

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

        const bars = computed(() => {
            const maxValue = Math.max(...data.value.map(d => d.value));

            const barHeight = height.value / (data.value.length * 2);

            return data.value.map((d, i) => {
                const barWidth = WIDTH * d.value / maxValue

                return {
                    label: d.label,
                    x: 0,
                    y: barHeight * (0.5 + 2 * i),
                    width: barWidth,
                    height: barHeight,
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
                value: Math.max(data.value[index].value - 1, 0),
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
            WIDTH, height, data, bars, 
            inc, dec, del, add
        }
    },
})
</script>

<style scoped>
    #bar {
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
