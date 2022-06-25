<template>
    <div>
        <div id="pie">
            <svg :width="WIDTH" :height="HEIGHT" :viewBox="`-${WIDTH/2} -${HEIGHT/2} ${WIDTH} ${HEIGHT}`">
                <template v-if="sectors.length > 1">
                    <g 
                        v-for="(sector, i) in sectors"
                        :key="i"
                    >
                        <path :d="calculatePath(sector.startAngle, sector.endAngle)" stroke="white" stroke-width="2" fill="red" />
                        <text
                            :x="calculatePoint(sector.startAngle + (sector.endAngle - sector.startAngle) /2, 1.1)[0]"
                            :y="calculatePoint(sector.startAngle + (sector.endAngle - sector.startAngle) /2, 1.1)[1]"
                            :text-anchor="sector.startAngle + (sector.endAngle - sector.startAngle) /2 <= Math.PI ? 'start' : 'end'"
                            alignment-baseline="central"
                        >{{ sector.label }}</text>
                    </g>
                </template>
                <g v-else-if="sectors.length === 1">
                    <circle cx="0" cy="0" :r="RADIUS" fill="red" />
                    <text
                        x="0"
                        :y="RADIUS * 1.1"
                        text-anchor="middle"
                        alignment-baseline="central"
                    >
                        {{ sectors[0].label }}
                    </text>
                </g>
                <text 
                    v-else
                    x="0"
                    y="0"
                    text-anchor="middle"
                    alignment-baseline="central"
                >
                    No data
                </text>
            </svg>
        </div>
        <div class="data">
            <div v-for="(d, i) in data" :key="i" class="data-row">
                <input v-model="data[i].label"> <button @click="dec(i)">-</button> {{ d.value }} <button @click="inc(i)">+</button> <button @click="del(i)">delete</button>
            </div>
        </div>
        <button @click="add">Add new sector</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent({
    setup() {
        const WIDTH = 800;
        const HEIGHT = 500;
        const RADIUS = (HEIGHT / 2) * 0.8;

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

        const sectors = computed(() => {
            const valueSum = data.value.reduce((acc, cur) => acc + cur.value, 0);

            let angle = 0;

            return data.value.filter(d => d.value > 0).map((d) => {
                const startAngle = angle;
                const endAngle = startAngle + (2 * Math.PI / valueSum) * d.value
                
                angle = endAngle;

                return {
                    label: d.label,
                    startAngle,
                    endAngle,
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

        const calculatePoint = (angle: number, factor = 1): [number, number] => {
            const x = Math.sin(angle) * RADIUS * factor
            const y = -Math.cos(angle) * RADIUS * factor
            return [x, y]
        }

        const calculatePath = (start: number, end: number): string => {
            const startPoint = calculatePoint(start).join(' ')
            const endPoint = calculatePoint(end).join(' ')

            const flags = end - start >= Math.PI ? '1 1' : '0 1'

            return `M 0 0 L ${startPoint} A ${RADIUS} ${RADIUS} 0 ${flags} ${endPoint} L 0 0`
        }

        return { 
            WIDTH, HEIGHT, RADIUS, data, sectors, 
            inc, dec, del, add,
            calculatePath, calculatePoint,
        }
    },
})
</script>

<style scoped>
    #pie {
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
