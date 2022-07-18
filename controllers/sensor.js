const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: process.env.ES_HOST + ":" + process.env.ES_PORT, // use the same version of your Elasticsearch instance
});
module.exports = {
    list(req, res) {
        const esIndex = process.env.INDEX_SENSOR;
        const esType = req.params.type;
        const keyword = req.params.keyword;
        const gte = req.params.gte;
        const lte = req.params.lte;
        const end = lte + "T23:59:59.999";
        const start = gte + "T00:00:00";
        client.search({
            index: esIndex,
            type: esType,
            body: {
                "query": {
                    "bool": {
                        "must": [
                            {
                                "query_string": {
                                    "query": keyword,
                                    "analyze_wildcard": true,
                                    "default_field": "*"
                                }
                            },
                            {
                                "range": {
                                    "date": {
                                        "time_zone": "+07:00",
                                        "gte": start,
                                        "lte": end
                                    }
                                }
                            }
                        ],
                        "must_not": [
                        ],
                        "should": []
                    }
                },
                "from": 0,
                "size": 10,
                "sort": [{
                    "date": {
                        "order": "desc",
                    }
                }],
                "aggs": {
                    "timeseries": {
                        "date_histogram": {
                            "field": "datetime",
                            "interval": "4h",
                            "time_zone": "Asia/Jakarta",
                            "min_doc_count": 1,
                            "format": "yyyy-MM-dd HH:mm"
                        }
                    },
                    "top_sensor_service": {
                        "terms": {
                            "field": "service.keyword",
                            "size": 10,
                            "order": {
                                "_count": "desc"
                            }
                        }
                    },
                    "impact": {
                        "filters": {
                            "filters": {
                                "medium": {
                                    "query_string": {
                                        "query": "medium",
                                        "analyze_wildcard": true,
                                        "default_field": "apprisk.keyword"
                                    }
                                },
                                "elevated": {
                                    "query_string": {
                                        "query": "elevated",
                                        "analyze_wildcard": true,
                                        "default_field": "apprisk.keyword"
                                    }
                                },
                                "low": {
                                    "query_string": {
                                        "query": "low",
                                        "analyze_wildcard": true,
                                        "default_field": "apprisk.keyword"
                                    }
                                },
                                "critical": {
                                    "query_string": {
                                        "query": "critical",
                                        "analyze_wildcard": true,
                                        "default_field": "apprisk.keyword"
                                    }
                                },
                                "high": {
                                    "query_string": {
                                        "query": "high",
                                        "analyze_wildcard": true,
                                        "default_field": "apprisk.keyword"
                                    }
                                },
                                
                            },
                        }
                    },
                    "top_method_sensor": {
                        "terms": {
                            "field": "httpmethod.keyword",
                            "size": 5,
                            "order": {
                                "_count": "desc"
                            }
                        }
                    },
                    "country_tag_dst": {
                        "terms": {
                            "field": "dstcountry.keyword",
                            "size": 1000,
                            "order": {
                                "_count": "desc"
                            }
                        }
                    },
                    "country_tag_src": {
                        "terms": {
                            "field": "srccountry.keyword",
                            "size": 1000,
                            "order": {
                                "_count": "desc"
                            }
                        }
                    },
                    "top_srcport": {
                        "terms": {
                            "field": "srcport.keyword",
                            "size": 10,
                            "order": {
                                "_count": "desc"
                            }
                        }
                    },
                    "top_dstport": {
                        "terms": {
                            "field": "dstport.keyword",
                            "size": 10,
                            "order": {
                                "_count": "desc"
                            }
                        }
                    },
                    "top_app": {
                        "terms": {
                            "field": "app.keyword",
                            "size": 10,
                            "order": {
                                "_count": "desc"
                            }
                        }
                    },
                    "top_appcat": {
                        "terms": {
                            "field": "appcat.keyword",
                            "size": 10,
                            "order": {
                                "_count": "desc"
                            }
                        }
                    },
                    "top_app_risk": {
                        "terms": {
                            "field": "apprisk.keyword",
                            "size": 10,
                            "order": {
                                "_count": "desc"
                            }
                        }
                    },
                    "top_direction": {
                        "terms": {
                            "field": "direction.keyword",
                            "size": 10,
                            "order": {
                                "_term": "desc"
                            }
                        }
                    },
                    "top_hostname": {
                        "terms": {
                            "field": "hostname.keyword",
                            "size": 10,
                            "order": {
                                "_count": "desc"
                            }
                        }
                    },
                    "top_agent": {
                        "terms": {
                            "field": "agent.keyword",
                            "size": 10,
                            "order": {
                                "_count": "desc"
                            }
                        }
                    },
                    "top_srcip": {
                        "terms": {
                            "field": "srcip.keyword",
                            "size": 10,
                            "order": {
                                "_count": "desc"
                            }
                        }
                    },
                    "top_dstip": {
                        "terms": {
                            "field": "dstip.keyword",
                            "size": 10,
                            "order": {
                                "_count": "desc"
                            }
                        }
                    },
                    "total_data": { "value_count": { "field": "_id" } },
                }
                
            }
        }, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: 2,
                    message: "Elasticsearch Timeout",
                });
            } else {
                const data = result.hits.hits.map(hit => hit._source);
                const agg = result.aggregations;
                res.status(200).send({
                    status: 1,
                    aggregation: agg,
                })
            }
        });
    },
    filterByRisk(req, res) {
        const esIndex = process.env.INDEX_SENSOR;
        const esType = 'doc';
        const keyword = req.body.keyword;
        const gte = req.body.gte;
        const lte = req.body.lte;
        const end = lte + "T23:59:59.999";
        const start = gte + "T00:00:00";
        var allRecords = [];
        
        client.search({
            index: esIndex,
            type: esType,
            scroll: '10s',
            body: {
                "_source": [
                    "date", "apprisk","srccountry","msg","httpmethod","path","hostname","srcip","devname","level","direction","service"
                  ],
                "query": {
                    "bool": {
                        "must": [
                            {
                                "query_string": {
                                    "query": '"' + keyword + '"',
                                    "analyze_wildcard": true,
                                    "default_field": "apprisk.keyword"
                                }
                            },
                            {
                                "range": {
                                    "date": {
                                        "time_zone": "+07:00",
                                        "gte": start,
                                        "lte": end
                                    }
                                }
                            }
                        ],
                        "must_not": [],
                        "should": []
                    }
                },
                "sort":  [{
                    "date": {
                        "order": "desc",
                    }
                }],
                
                
            }
        }, function getMoreUntilDone(error, response) {
            // collect all the records
            response.hits.hits.forEach(function (hit) {
                allRecords.push(hit);
            });
            
            if (response.hits.total !== allRecords.length) {
                // now we can call scroll over and over
                client.scroll({
                    scrollId: response._scroll_id,
                    scroll: '10s'
                }, getMoreUntilDone);
            } else {
                
                res.status(200).send({
                    draw: 1,
                    data: allRecords,
                    
                })
            }
        });
    },
    filterByService(req, res) {
        const esIndex = process.env.INDEX_SENSOR;
        const esType = 'doc';
        const keyword = req.body.keyword;
        const gte = req.body.gte;
        const lte = req.body.lte;
        const end = lte + "T23:59:59.999";
        const start = gte + "T00:00:00";
        var allRecords = [];
        console.log('b');
        client.search({
            index: esIndex,
            type: esType,
            scroll: '10s',
            body: {
                "_source": [
                    "date", "apprisk","srccountry","msg","httpmethod","path","hostname","srcip","devname","level","direction","service"
                  ],
                "query": {
                    "bool": {
                        "must": [
                            {
                                "query_string": {
                                    "query": '"' + keyword + '"',
                                    "analyze_wildcard": true,
                                    "default_field": "service.keyword"
                                }
                            },
                            {
                                "range": {
                                    "date": {
                                        "time_zone": "+07:00",
                                        "gte": start,
                                        "lte": end
                                    }
                                }
                            }
                        ],
                        "must_not": [],
                        "should": []
                    }
                },
                "sort":  [{
                    "date": {
                        "order": "desc",
                    }
                }],
                
                
            }
        }, function getMoreUntilDone(error, response) {
            // collect all the records
            response.hits.hits.forEach(function (hit) {
                allRecords.push(hit);
            });
            
            if (response.hits.total !== allRecords.length) {
                // now we can call scroll over and over
                client.scroll({
                    scrollId: response._scroll_id,
                    scroll: '10s'
                }, getMoreUntilDone);
            } else {
                
                res.status(200).send({
                    draw: 1,
                    data: allRecords,
                    
                })
            }
        });
    },
    filterByDirection(req, res) {
        const esIndex = process.env.INDEX_SENSOR;
        const esType = 'doc';
        const keyword = req.body.keyword;
        const gte = req.body.gte;
        const lte = req.body.lte;
        const end = lte + "T23:59:59.999";
        const start = gte + "T00:00:00";
        var allRecords = [];
        
        client.search({
            index: esIndex,
            type: esType,
            scroll: '10s',
            body: {
                "_source": [
                    "date", "apprisk","srccountry","msg","httpmethod","path","hostname","srcip","devname","level","direction","service"
                  ],
                "query": {
                    "bool": {
                        "must": [
                            {
                                "query_string": {
                                    "query": '"' + keyword + '"',
                                    "analyze_wildcard": true,
                                    "default_field": "direction.keyword"
                                }
                            },
                            {
                                "range": {
                                    "date": {
                                        "time_zone": "+07:00",
                                        "gte": start,
                                        "lte": end
                                    }
                                }
                            }
                        ],
                        "must_not": [],
                        "should": []
                    }
                },
                "sort":  [{
                    "date": {
                        "order": "desc",
                    }
                }],
                
                
            }
        }, function getMoreUntilDone(error, response) {
            // collect all the records
            response.hits.hits.forEach(function (hit) {
                allRecords.push(hit);
            });
            
            if (response.hits.total !== allRecords.length) {
                // now we can call scroll over and over
                client.scroll({
                    scrollId: response._scroll_id,
                    scroll: '10s'
                }, getMoreUntilDone);
            } else {
                
                res.status(200).send({
                    draw: 1,
                    data: allRecords,
                    
                })
            }
        });
    },
    filterBydstCountry(req, res) {
        const esIndex = process.env.INDEX_SENSOR;
        const esType = 'doc';
        const keyword = req.body.keyword;
        const gte = req.body.gte;
        const lte = req.body.lte;
        const end = lte + "T23:59:59.999";
        const start = gte + "T00:00:00";
        var allRecords = [];
        
        client.search({
            index: esIndex,
            type: esType,
            scroll: '10s',
            body: {
                "_source": [
                    "date", "apprisk","srccountry","msg","httpmethod","path","hostname","srcip","devname","level","direction","service"
                  ],
                "query": {
                    "bool": {
                        "must": [
                            {
                                "query_string": {
                                    "query": '"' + keyword + '"',
                                    "analyze_wildcard": true,
                                    "default_field": "dstcountry.keyword"
                                }
                            },
                            {
                                "range": {
                                    "date": {
                                        "time_zone": "+07:00",
                                        "gte": start,
                                        "lte": end
                                    }
                                }
                            }
                        ],
                        "must_not": [],
                        "should": []
                    }
                },
                "sort":  [{
                    "date": {
                        "order": "desc",
                    }
                }],
                
                
            }
        }, function getMoreUntilDone(error, response) {
            // collect all the records
            response.hits.hits.forEach(function (hit) {
                allRecords.push(hit);
            });
            
            if (response.hits.total !== allRecords.length) {
                // now we can call scroll over and over
                client.scroll({
                    scrollId: response._scroll_id,
                    scroll: '10s'
                }, getMoreUntilDone);
            } else {
                
                res.status(200).send({
                    draw: 1,
                    data: allRecords,
                    
                })
            }
        });
    },
    filterBysrcCountry(req, res) {
        const esIndex = process.env.INDEX_SENSOR;
        const esType = 'doc';
        const keyword = req.body.keyword;
        const gte = req.body.gte;
        const lte = req.body.lte;
        const end = lte + "T23:59:59.999";
        const start = gte + "T00:00:00";
        var allRecords = [];
        
        client.search({
            index: esIndex,
            type: esType,
            scroll: '10s',
            body: {
                "_source": [
                    "date", "apprisk","srccountry","msg","httpmethod","path","hostname","srcip","devname","level","direction","service"
                  ],
                "query": {
                    "bool": {
                        "must": [
                            {
                                "query_string": {
                                    "query": '"' + keyword + '"',
                                    "analyze_wildcard": true,
                                    "default_field": "srccountry.keyword"
                                }
                            },
                            {
                                "range": {
                                    "date": {
                                        "time_zone": "+07:00",
                                        "gte": start,
                                        "lte": end
                                    }
                                }
                            }
                        ],
                        "must_not": [],
                        "should": []
                    }
                },
                "sort":  [{
                    "date": {
                        "order": "desc",
                    }
                }],
                
                
            }
        }, function getMoreUntilDone(error, response) {
            // collect all the records
            response.hits.hits.forEach(function (hit) {
                allRecords.push(hit);
            });
            
            if (response.hits.total !== allRecords.length) {
                // now we can call scroll over and over
                client.scroll({
                    scrollId: response._scroll_id,
                    scroll: '10s'
                }, getMoreUntilDone);
            } else {
                
                res.status(200).send({
                    draw: 1,
                    data: allRecords,
                    
                })
            }
        });
    },
    search(req, res) {
        const esIndex = process.env.INDEX_SENSOR;
        const esType = 'doc';
        const keyword = req.body.keyword;
        const gte = req.body.gte;
        const lte = req.body.lte;
        const end = lte + "T23:59:59.999";
        const start = gte + "T00:00:00";
        var allRecords = [];
        
        client.search({
            index: esIndex,
            type: esType,
            scroll: '10s',
            body: {
                "_source": [
                    "date", "apprisk","srccountry","msg","httpmethod","path","hostname","srcip","devname","level","direction","service"
                  ],
                "query": {
                    "bool": {
                        "must": [
                            {
                                "query_string": {
                                    "query": '"' + keyword + '"',
                                    "analyze_wildcard": true,
                                    "default_field": "*"
                                }
                            },
                            {
                                "range": {
                                    "date": {
                                        "time_zone": "+07:00",
                                        "gte": start,
                                        "lte": end
                                    }
                                }
                            }
                        ],
                        "must_not": [],
                        "should": []
                    }
                },
                "sort":  [{
                    "date": {
                        "order": "desc",
                    }
                }],
                
                
            }
        }, function getMoreUntilDone(error, response) {
            // collect all the records
            response.hits.hits.forEach(function (hit) {
                allRecords.push(hit);
            });
            
            if (response.hits.total !== allRecords.length) {
                // now we can call scroll over and over
                client.scroll({
                    scrollId: response._scroll_id,
                    scroll: '10s'
                }, getMoreUntilDone);
            } else {
                
                res.status(200).send({
                    draw: 1,
                    data: allRecords,
                    
                })
            }
        });
    }
    
};