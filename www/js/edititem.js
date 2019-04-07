/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * 'License'); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    },

    onDeviceReady: function() {
        const id = location.search.substring(4)
        const item = JSON.parse(localStorage.getItem('items'))[id]
        
        document.getElementById('title').value = item[0]
        document.getElementById('date').valueAsDate = new Date(item[1])
        document.getElementById('confirm').addEventListener('click', (() => this.updateItem(id)), false)
    },
    
    updateItem: function(id) {
        const title = document.getElementById('title').value
        const date = this.getDate()
        
        let items = JSON.parse(localStorage.getItem('items'))
        const item = [title, date]
        
        
        items[id] = item
        items = this.sortItems(items)
        
        localStorage.setItem('items', JSON.stringify(items))
        
        navigator.app.backHistory()
    },
    
    getDate: function() {
        const selectedDate = document.getElementById('date').valueAsDate
        selectedDate.setHours(24)
        
        return selectedDate.toString()
    },
    
    sortItems: function(items) {
        let sort
        
        do {
            sort = false
            for (let i=0; i<items.length-1; i++) {
                if (new Date(items[i][1]) > new Date(items[i+1][1])) {
                    [items[i], items[i+1]] = [items[i+1], items[i]]
                    sort = true
                }
            }
        } while (sort)
        
        return items
    }
};

app.initialize()
